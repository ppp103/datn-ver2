import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from '../../../models/question';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageQuestionIoComponent } from './manage-question-io/manage-question-io.component';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrl: './manage-question.component.css',
})
export class ManageQuestionComponent implements OnInit {
  questions: any;
  formSearch!: FormGroup;
  dialogRef !: MatDialogRef<any>;
  dataList : any;
  constructor(private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.formSearch = this.fb.group({
      keyWord: [''],
    });
  }

  ngOnInit() {
    // this.questionService.getFetchAll().subscribe((res) => {
    //   console.log(res);
    //   this.questions = res;
    // });
    // this.questions = res;
    // this.questions = await this.questionService.getDataFromAPI();
    // console.log(this.questions);
    this.loadData();
  }

  async loadData() {
    this.dataList = await this.questionService.getFetchAll();
    this.dataList.map((item: Question, index: number) => {
      item.serialNumber = index + 1;
    })
    this.questions = this.dataList;
    console.log(this.dataList);
    // this.questions = this.dataList;
    // console.log(this.questions);
    // this.questionService.getDataFromAPI().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.questions = data; // Assign data to the questions property
    //     this.questions.map((question : Question, index: number)=> {
    //       question.deleted = false;
    //       question.serialNumber = index + 1;
    //     })

    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // });

  }

  goDeTail(id: any){
    this.router.navigate(['admin/question-bank/question', id]);

  }

  onToggle(e: any){
    console.log(e);
  }

  openAddForm(){
    this.dialogRef = this.dialog.open(ManageQuestionIoComponent);
  }
}
