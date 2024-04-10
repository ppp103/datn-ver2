import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from '../../../../services/question/question.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.scss'
})
export class QuestionDetailComponent {
  createForm !: FormGroup
  constructor(private questionService: QuestionService,
    private fb: FormBuilder,
    private dialog: MatDialog,

  ) {
    this.createForm = this.fb.group({
    });
  }
  onSaveAndClose(){

  }

  onToggle(e: any){

  }

  closeDialog(){

  }
}
