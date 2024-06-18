import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../services/test/test.service';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-test-result-preview',
  templateUrl: './test-result-preview.component.html',
  styleUrl: './test-result-preview.component.scss'
})
export class TestResultPreviewComponent {
  exam: any;
  questions: any;
  practiceTest: any;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private testService : TestService,
    private practiceTestService : PracticeTestService,
    private el: ElementRef,
    private dataSharedService: SharedDataService

  ){
    
  }
  
  ngOnInit(): void {
    let choiceId = 0;

    // this.route.params.subscribe(params => {
    //   this.id = params['practiceTest'];
    // });
    // this.practiceTestService.getPracticeTestById(this.id).subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.practiceTest = res;
    //     this.questions = res.answerSheets
    //     this.questions.forEach((question : any) => {
    //       // Set lại mảng choices của từng câu hỏi
    //       question.choices = [];
    //       for (let i = 1; i <= 4; i++) {
    //         // Set Id
    //         choiceId++;
    //         const optionKey = `option${i}`;
    //         if (question[optionKey] !== null && question[optionKey] !== '') {
    //           question.choices.push({
    //             id: choiceId,
    //             choiceText: question[optionKey],
    //             isCorrect: question.correctOption == question[optionKey]
    //           });
    //         }
    //       }
    //     });
    //   this.testService.getTestById(this.practiceTest.testId).subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.exam = res;
    //   }
    // });
    //   }
    // });
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.testService.getTestById(this.id).subscribe({
      next: res => {
        this.exam = res;
        console.log(this.exam);
      }
    });
    // this.practiceTest
    console.log(this.dataSharedService.getData());
    const res = this.dataSharedService.getData();
      this.practiceTest = res;
      this.questions = res.answerSheets
        this.questions.forEach((question : any) => {
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
                isCorrect: question.correctOption == question[optionKey]
              });
            }
          }
      });

  }

  scrollToQuestion(questionNumber: number){
    const questionId = 'question-' + questionNumber;
    const questionElement = this.el.nativeElement.querySelector('#' + questionId);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
