import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrl: './manage-question.component.css',
})
export class ManageQuestionComponent implements OnInit {
  questions: any;
  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getFetchAll().subscribe((res) => {
      console.log(res);
      this.questions = res;
    });
    // this.questions = res;
  }
}
