import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../services/test/test.service';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent implements OnInit {
  id: any;
  exam: any;
  questions: any;
  practiceTest: any;
  constructor(
    private route: ActivatedRoute,
    private testService : TestService,
    private practiceTestService : PracticeTestService,
    private el: ElementRef

  ){
    
  }

    ngOnInit(): void {
    let choiceId = 0;

    this.route.params.subscribe(params => {
      this.id = params['practiceTest'];
    });
    this.practiceTestService.getPracticeTestById(this.id).subscribe({
      next: res => {
        console.log(res);
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
      this.testService.getTestById(this.practiceTest.testId).subscribe({
      next: res => {
        console.log(res);
        this.exam = res;
      }
    });
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
