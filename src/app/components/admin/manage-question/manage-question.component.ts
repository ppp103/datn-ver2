import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from '../../../models/question';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageQuestionIoComponent } from './manage-question-io/manage-question-io.component';
import { Constant } from '../../../constants/constants';
@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrl: './manage-question.component.css',
})
export class ManageQuestionComponent implements OnInit {
  questions: any;
  formSearch!: FormGroup;
  public pagging: any;

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

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.questionService.getDataFromServer(state);
    this.questionService.subscribe((res: any) => {
      this.pagging = res;
      console.log(res);
      if (res.result) {
        this.questions = res.result;
        this.clearTabHeadLine(this.questions);
      }
    });
    // this.dataList = await this.questionService.getFetchAll(Constant.PageSetting);
    // this.dataList.items.map((item: Question, index: number) => {
    //   item.serialNumber = index + 1;
    // })
    // this.questions = this.dataList.items;
    // console.log(this.dataList);
  }

  clearTabHeadLine(data: any) {
    data.forEach((el :any) => {
      if (el.content) {
        el.sumaryContent = el.content.replace(/\&nbsp;/g, '');
      }
    });
  }

  // async loadData() {
  //   this.dataList = await this.questionService.getFetchAll(Constant.PageSetting);
  //   this.dataList.items.map((item: Question, index: number) => {
  //     item.serialNumber = index + 1;
  //   })
  //   this.questions = this.dataList.items;
  //   console.log(this.dataList);
  // }

  goDeTail(id: any){
    // this.router.navigate(['admin/question-bank/question', id]);
  }

  onToggle(e: any){
    console.log(e);
  }

  openAddForm(){
    this.dialogRef = this.dialog.open(ManageQuestionIoComponent);
  }
}
