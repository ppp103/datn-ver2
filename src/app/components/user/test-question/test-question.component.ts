import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import { QuestionService } from '../../../services/question/question.service';
import { TestService } from '../../../services/test/test.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrl: './test-question.component.scss',
})
export class TestQuestionComponent {
  // counter!: number;
  counter = 10;
  countDown!: Subscription;
  tick = 1000;
  id: any;
  exam: any;
  toggleModal: any;
  questions: any;
  private subscription: any;

  constructor(private router: Router,
    private questionService : QuestionService,
    private testService : TestService,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
  // this.startTimer();
  // this.subscription = interval(10000).subscribe((x) => {
  //   this.saveToServer(false);
  // });
  let choiceId = 0;
  this.route.params.subscribe(params => {
    this.id = params['id'];
  });
  this.testService.getTestById(this.id).subscribe({
    next: res => {
      this.exam = res;
      this.counter = this.exam.time * 60;
      this.questionService.getQuestionByTestId(this.id).subscribe(res => {
        this.questions = res;
        console.log(this.questions);
        this.questions.forEach((question : any) => {
          question.choices = [];
          for (let i = 1; i <= 4; i++) {
            choiceId++;
            const optionKey = `option${i}`;
            if (question[optionKey] !== null && question[optionKey] !== '') {
              question.choices.push({
                id: choiceId,
                choiceText: question[optionKey],
                isSelected: 0,
                // isCorrected:
                //   question[optionKey] === question.correctOption ? 1 : 0,
              });
            }
          }
        });
        console.log(this.questions);
      });
    }
  });
}


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }

  startTimer() {
    // this.subscription = interval(1000).subscribe(() => {
    //   if (this.counter > 0) {
    //     this.counter--; // Decrement the timer value every second
    //   } else {
    //     this.countDown.unsubscribe(); // Stop the timer when it reaches 0
    //   }
    // });
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      } else {
        this.counter = 0;
        this.submit();
      }
    });
  }

  changeChoiceMC(i : number, quesId : number){
    console.log(i);
    // console.log(quesId, 'quesID');
    console.log(this.questions);
    // this.questions.map((question : any) => {
    //   if(question.id != quesId) return;
    //   if(!question.choices) return; 
    //   question.choices.map((choice : any) =>{
    //     choice.isSelected = 0;
    //   })
    //   question.choices[i].isSelected = 1;
    // })
    const question = this.questions.find((x: any) => x.id === quesId);
    console.log(question);
    question.choices.map((x : any) => x.id === i ? (x.isSelected = 1) : (x.isSelected = 0));
    question.choices.map((choice : any) => console.log(choice))
  }

  showModal() {
    this.toggleModal = true;
  }

  closeModal() {
    this.toggleModal = false;
  }

  submit() {
    console.log('click');
    this.router.navigate(['user/test/detail/result']);
  }

  selectAnswerTF(value: any, id: number){

  }


  selectedAnswerMC(value: any, questionId: number, choiceId: number){

  }
}
