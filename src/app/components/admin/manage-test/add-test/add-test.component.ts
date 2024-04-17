import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from '../../../../services/topics/topic.service';
import { QuestionService } from '../../../../services/question/question.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonServiceShared } from '../../../../services/base/common-service.service';
import { TestService } from '../../../../services/test/test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DebounceDirective } from '../../../../directives/debounce.directive';
@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.scss',
})
export class AddTestComponent implements OnInit {
  createForm!: FormGroup;
  fields: any;
  topics: any;
  pagging: any;
  questions: any = [];
  totalTime: any;
  totalPoint: any;
  inputModel: any;
  testName: any;
  formErrors = {
    testName: ''
  }
  formSearch = {
    ChuDeId: '',
    DifficultyLevel: ''
  };
  questionListSelected: any = [];
  fileValue: any;
  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private questionService: QuestionService,
    private commonService: CommonServiceShared,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.route.params.subscribe(() => {
      console.log('in subscribe');
      this.questionListSelected.splice(0, this.questionListSelected.length);
      console.log(this.questionListSelected, 'selected');
      this.loadData()
      this.loadTopic()
    })
  }

  ngOnInit() {
    this.createForm = this.fb.group({
      testName: [''],
      time: [''],
    });

    // this.formSearch = this.fb.group({
    //   ChuDeId: [''],
    //   DifficultyLevel: ['']
    // })
    //////////// test
    // this.loadData()
    // this.loadTopic()
  }

  async loadTopic() {
    this.topics = await this.topicService.getFetchAll();
    this.fields = { dataSource: this.topics, value: 'id', text: 'name', child: 'child' }

  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.questionService.getPaggingData(state, {...this.formSearch});
    console.log({...this.formSearch});
    this.questionService.subscribe((res: any) => {
      console.log(res, 'resss');
      this.pagging = res;
      if (res.result) {
        res.result = res.result.filter((question: any) => {
          // Trả về true nếu question.id không tồn tại trong this.questionListSelected
          return !this.questionListSelected.some((selectedQuestion: any) => selectedQuestion.id === question.id);
      });
        this.questions = res.result;
        console.log(res.result);
        //////////////////// test data
        // this.questionListSelected = res.result
        this.questions.map((question : any) => {
          question.isSelected = false;
        })
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

  getTotalPoint(){
    return this.questionListSelected.reduce((total: number, currentQ: any) => {
      return total += currentQ.point;
    }, 0);
  }

  getTotalTime(){
    return this.questionListSelected.reduce((total: number, currentQ: any) => {
      return total += currentQ.time;
    }, 0);
  }

  addSelectedQuestion(){
    const selectedQuestion = this.questions.filter((question : any) => question.isSelected == true )
    if(selectedQuestion.length > 0){
      selectedQuestion.forEach((question:any) => {
        this.questionListSelected.push(question);
      })
      this.totalTime = this.getTotalTime();
      this.totalPoint = this.getTotalPoint();
      this.commonService.showeNotiResult('Thêm câu hỏi thành công', 1000)
      this.loadData();
    }
  }

  removeSelectedQuestion(ques: any) {
    const index = this.questionListSelected.findIndex((item:any) => item.id === ques.id);
    this.questionListSelected.splice(index, 1);
    this.totalTime = this.getTotalTime();
    this.totalPoint = this.getTotalPoint();
    this.loadData();
  }

  onSubmit() {
    this.validate();
    const ids = this.questionListSelected.map((item:any) => item.id)
    this.testService.addTest(
      {
        testName: this.testName, 
        time: this.totalTime, 
        totalPoint: this.totalPoint,
        numberOfQuestion: this.questionListSelected.length,
        imgLink: this.fileValue,
        ids: ids
      }).subscribe({
          next: (res) => console.log(res),
          error: (error: HttpErrorResponse) => {
            this.commonService.showeNotiResult('Thêm bài test thất bại', 2000);

          },
          complete: async () => {
            this.commonService.showeNotiResult('Thêm bài test thành công', 2000);
            this.returnList();
          },
      })
  }

  validate() {
    if(!this.testName){
      this.formErrors.testName = 'Tên test không được để trống'
    }
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionListSelected, event.previousIndex, event.currentIndex);
  }

  returnList() {
    this.router.navigate(['/admin/tests']);
  }

  checkBoxAll(e: any){
    this.questions.forEach((question:any) => {
      question.isSelected = !question.isSelected
    })
  }

  selectFile(event: any) {
    // this.createForm.value.File = event.target.files[0];
    this.fileValue = event.target.files[0];
  }
}
