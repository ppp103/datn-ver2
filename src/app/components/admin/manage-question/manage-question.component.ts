import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question/question.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from '../../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageQuestionIoComponent } from './manage-question-io/manage-question-io.component';
import { Constant } from '../../../constants/constants';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { QuestionCategoryService } from '../../../services/question-category/question-category.service';
import { TopicService } from '../../../services/topics/topic.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrl: './manage-question.component.css',
})
export class ManageQuestionComponent implements OnInit {
  questions: any;
  questionCategories: any;
  formSearch!: FormGroup;
  public pagging: any;
  isDetailPage: any;
  topicId: any;
  dialogRef!: MatDialogRef<any>;
  dataList: any;
  selectedItem: any;
  fields: any;
  topics: any;
  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private commonService: CommonServiceShared,
    private questionCategoryService: QuestionCategoryService,
    private topicService: TopicService,
    private route : ActivatedRoute,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.checkParams();
    this.formInit();
    this.loadData();
    this.loadQuestionCategory();
    this.loadTopics();

  }

  goBack() {
    this.location.back();
  }

  checkParams(): void {
    this.route.params.subscribe(params => {
      this.isDetailPage = params.hasOwnProperty('topicId') ? true : false 
      if(this.isDetailPage){
        this.topicId = Number(this.route.snapshot.paramMap.get('topicId'));
      }

      // console.log(this.isDtailPage, "part page");

    });
  }
  
  async loadTopics() {
    const res: any = await this.topicService.getTopicTree(); 
    this.topics = res.items;
    this.fields = { dataSource: this.topics, value: 'id', text: 'name', child: 'child' }

    console.log(this.topics);
  }

  async loadQuestionCategory() {
    this.questionCategories = await this.questionCategoryService.getFetchAll();
    console.log(this.questionCategories);
  }

  formInit() {
    this.formSearch = this.fb.group({
      keyWord: [''],
      chuDeId: [''],
      loaiCauId: ['']
    });
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };

    if(this.isDetailPage){
      this.formSearch.value.chuDeId = this.topicId;
    }

    this.questionService.getPaggingData(state, {...this.formSearch.value});

    this.questionService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.questions = res.result;
        this.clearTabHeadLine(this.questions);
      }
    });
  }

  clearTabHeadLine(data: any) {
    data.forEach((el: any) => {
      if (el.content) {
        el.sumaryContent = el.content.replace(/\&nbsp;/g, '');
      }
    });
  }

  goDeTail(id: any) {
    this.router.navigate([`/admin/questions/${id}`])
  }

  onToggle(e: any) {
    console.log(e);
  }

  openAddForm(item: any, status: any) {
    this.dialogRef = this.dialog.open(ManageQuestionIoComponent, {
      data: { item: item, status: status },
    });
    this.dialogRef.afterClosed().subscribe(async (dataChanged) => {
      if (dataChanged) {
        await this.loadData();
      }
    });
  }

  // Hàm lấy ra đối tượng khi người dùng click vào một trong 3 nút xóa, chi tiết, sửa
  async getItemByEvent(id: any, mode = 'edit') {
    console.log(id);
    this.selectedItem = await firstValueFrom(
      this.questionService.getQuestionById(id)
    );
    if (mode === 'edit') {
      this.openAddForm(this.selectedItem, mode);
    } else if (mode === 'delete') {
      let result = this.commonService.confirmDiaLogService(
        'Cảnh báo',
        `Bạn chắc chắn muốn xóa câu hỏi ${this.selectedItem.content} chứ?`,
        ''
      );
      // Nếu người dùng ấn nút xác nhận thì xóa và cập nhật lại data
      result.afterClosed().subscribe(async (res) => {
        if (res === 'confirm') {
          // Xóa
          this.questionService.deleteQuestion(this.selectedItem.id).subscribe({
            next: (res) => console.log(res),
            error: (error: HttpErrorResponse) => {
              console.log(error);
              this.commonService.showeNotiResult(error.error.DevMessage, 2000);
            },
            complete: async () => {
              this.commonService.showeNotiResult('Xoá thành công', 2000);
              // Update data
              await this.loadData();
            },
          });
        } else {
          return;
        }
      });
    }
  }

  
  async formReset() {
    this.formInit();
    await this.loadData();
  }

}
