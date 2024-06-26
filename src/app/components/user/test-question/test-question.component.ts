import { Component, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import { QuestionService } from '../../../services/question/question.service';
import { TestService } from '../../../services/test/test.service';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { error } from 'console';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { AuthService } from '../../../services/auth/auth.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrl: './test-question.component.scss',
})
export class TestQuestionComponent {
  @Input() isStimulate: any; 
  // counter!: number;
  counter = 10;
  totalTime: any;
  countDown!: Subscription;
  tick = 1000;
  id: any;
  exam: any;
  toggleModal: any;
  questions: any;
  private subscription: any;
  inputModel= {};
  answerSheets: any = [];
  user: any;
  constructor(private router: Router,
    private questionService : QuestionService,
    private testService : TestService,
    private practiceTestService: PracticeTestService,
    private route : ActivatedRoute,
    private el: ElementRef,
    private commonService: CommonServiceShared,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {
    this.user = this.authService.getUserDataFromLocal();
  }

  ngOnInit(): void {
    if(!this.isStimulate){
      this.startTimer();
    }

    let choiceId = 0;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.testService.getTestById(this.id).subscribe({
      next: res => {
        this.exam = res;
        this.counter = this.exam.time;
        this.totalTime = this.counter;
        this.questionService.getQuestionByTestId(this.id).subscribe(res => {
          this.questions = res;
          this.questions.forEach((question : any) => {
            // Set highlight cho câu hỏi là false
            question.isHiglighted = false;
            question.isAnswered = false;

            // Set lại mảng choices của từng câu hỏi
            question.choices = [];
            for (let i = 1; i <= 4; i++) {
              // Set Id
              choiceId++;
              const optionKey = `option${i}`;
              if (question[optionKey] !== null && question[optionKey] !== '') {
                question.choices.push({
                  id: choiceId,
                  choiceText: question[optionKey],
                  isSelected: 0,
                });
              }
            }
          });
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

  scrollToQuestion(questionNumber: number){
    const questionId = 'question-' + questionNumber;
    const questionElement = this.el.nativeElement.querySelector('#' + questionId);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  startTimer() {
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
    const question = this.questions.find((x: any) => x.id === quesId);
    question.choices.map((x : any) => x.id === i ? (x.isSelected = 1) : (x.isSelected = 0));
    question.isAnswered = true;
  }

  showModal() {
    this.toggleModal = true;
  }

  closeModal() {
    this.toggleModal = false;
  }

  submit() {
    // Lấy ra các đáp án đã chọn
    this.getAnswerSheets();
    console.log(this.answerSheets);
    // Check xem tất cả các đáp án đã được trả lời
    const hasEmptyOption = this.answerSheets.some((answer : any) => answer.chosenOption == '')
    // const hasEmptyOption = this.questions.some((question : any) => question.isAnswered == false)

    console.log(hasEmptyOption);
    if(hasEmptyOption) {
      this.commonService.showeNotiResult('Vui lòng trả lời hết tất cả các câu hỏi', 2000);
      return;
    }
    console.log(this.isStimulate);
    if(!this.isStimulate){
      this.addPracticeTest();
    }else{
      this.addStimulationPracticeTest();
    }
  }

  addStimulationPracticeTest(){
    this.inputModel = {
      time: this.totalTime - this.counter,
      userId: this.user.Id,
      testId: this.exam.id,
      createdBy: this.user.Name,
      answerSheets: this.answerSheets
    }
    
    this.practiceTestService.addStimulationTest(this.inputModel).subscribe({
      next: (res) =>{
        // this.router.navigate([`user/test/${res.id}/result`]);
        console.log(res);
        this.sharedDataService.setData(res)
        console.log(this.sharedDataService.getData());
        this.router.navigate([`admin/tests/${this.id}/preview/result`]);

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAnswerSheets(){
      // Reset lại answerSheet sau khi nhấn nộp bài 1 lần
      this.answerSheets = [];

      this.questions.forEach((question : any) => {
      console.log(question, 'quessstion');
      let chosenOption = '';
      question.choices.forEach((choice : any) => {
        if(choice.isSelected){
          chosenOption = choice.choiceText;
        }
      })
      this.answerSheets.push({
        questionId: question.id,
        chosenOption: chosenOption,
        point: question.point
      })
    })
  }

  addPracticeTest(){
    this.inputModel = {
      time: this.totalTime - this.counter,
      userId: this.user.Id,
      testId: this.exam.id,
      createdBy: this.user.Name,
      answerSheets: this.answerSheets
    }
    
    this.practiceTestService.addPracticeTest(this.inputModel).subscribe({
      next: (res) =>{
        this.router.navigate([`user/test/${res.id}/result`]);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  highlightQuestion(question: any){
    question.isHiglighted = !question.isHiglighted; // Highlight the clicked question
  }
}
