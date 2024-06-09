import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from '../../../../services/topics/topic.service';
import { QuestionService } from '../../../../services/question/question.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonServiceShared } from '../../../../services/base/common-service.service';
import { TestService } from '../../../../services/test/test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DebounceDirective } from '../../../../directives/debounce.directive';
import { PracticeTestService } from '../../../../services/practice-test/practice-test.service';
import { TestCategoryService } from '../../../../services/test-category/test-category.service';
import { GridComponent, TextWrapSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Tooltip } from '@syncfusion/ej2-popups'; 
import { AuthService } from '../../../../services/auth/auth.service';
@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.scss',
})
export class AddTestComponent implements OnInit {
  @ViewChild('grid', { static: false }) public grid!: GridComponent;

  createForm!: FormGroup;
  fields: any;
  topics: any;
  questions: any = [];
  totalTime: any;
  totalPoint: any;
  inputModel: any;
  testName: any;
  testId: any;
  testCategoryId: any;
  testCategories: any;
  formData: any;
  editTest: any = false;
  defaultImg = 'https://localhost:7253/images/tests/avatar-default.png'
  previewUrl: string | ArrayBuffer | null = null;
  public wrapSettings?: TextWrapSettingsModel;
  
  formErrors = {
    testName: '',
    testCategory: '',
  }
  formSearch = {
    ChuDeId: '',
    DifficultyLevel: ''
  };
  questionListSelected: any = [];
  fileValue: any;

  test: any;
  selectedQuestions: any;
  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private questionService: QuestionService,
    private commonService: CommonServiceShared,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private testCategoryService: TestCategoryService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((param) => {
      this.questionListSelected.splice(0, this.questionListSelected.length);
      this.loadData();
      this.loadTopic()
      this.loadTestCategory();

      const id = param['id'];
      if(id){
        this.testId = id;
        this.editTest = true;
        this.mapObjToForm(id);
      }
    })
  }

  headerCellInfo(args: any) { 
    console.log(args.cell.column.field);
    if(args.cell.column.field){
      const toolcontent = args.cell.column.headerText; 
      const tooltip: Tooltip = new Tooltip({ 
        content: toolcontent 
      });   
      tooltip.appendTo(args.node); 
    }
  }

  mapObjToForm(testId: any) {
    this.testService.getTestById(testId).subscribe((test) => {
      this.questionService.getQuestionByTestId(test.id).subscribe((questionData) => {

        // this.questions.forEach((question: any) => {
        //   questionData.forEach((questionDatum: any) => {
        //     if(question.id == questionDatum.id){
        //       this.questions = this.questions.filter((item: any) => item.id !== question.id);
        //     }
        //   })
        // })

        this.testName = test.testName
        this.testCategoryId = test.testCategoryId;
        this.previewUrl = test.imgLink;
        /// Set các câu hỏi đã chọn
        // Tạo một tập hợp các id từ questionData
        const idsToRemove = new Set(questionData.map((questionDatum: any) => questionDatum.id));

        // Lọc mảng this.questions để loại bỏ các phần tử có id nằm trong idsToRemove
        this.questions = this.questions.filter((question: any) => !idsToRemove.has(question.id));

        this.questionListSelected = questionData;
        this.totalTime = this.getTotalTime();
        this.totalPoint = this.getTotalPoint();
      })

    });

  }
  async loadTestCategory() {
    const res: any = await this.testCategoryService.getTestCategory();
    this.testCategories = res
  }

  ngOnInit() {
    this.wrapSettings = { wrapMode: 'Content' };
  }

  async loadTopic() {
    const res: any = await this.topicService.getFetchAll();
    this.topics = res.items;
    this.fields = { dataSource: this.topics, value: 'id', text: 'name', child: 'child' }
  }

  async loadData() {
    const res: any = await this.questionService.getQuestions({...this.formSearch, PageSize: -1});
      if (res.items) {
        res.items = res.items.filter((question: any) => {
          // Trả về true nếu question.id không tồn tại trong this.questionListSelected
          return !this.questionListSelected.some((selectedQuestion: any) => selectedQuestion.id === question.id);
        });
        this.questions = res.items;

        this.questions.map((question : any, index: number) => {
          question.isSelected = false;
          question.serialNumber = index + 1;
        })
      }
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
    const selectedQuestion = this.grid.getSelectedRecords();
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
    const ids = this.questionListSelected.map((item:any) => item.id);
    this.formData = new FormData();

    this.formData.append("TestName", this.testName);
    this.formData.append("Time", this.totalTime * 60);
    this.formData.append("TotalPoint",  this.totalPoint);
    this.formData.append("NumberOfQuestion",  this.questionListSelected.length);
    this.formData.append("TestCategoryId",   this.testCategoryId);
    this.formData.append("File", this.fileValue);

    ids.forEach((id:any) => this.formData.append('Ids', id.toString()));

    if(this.editTest){
      this.formData.append("Id", this.testId);
      this.testService.updateTest(this.formData).subscribe({
        next: (res) => console.log(res),
        error: (error: HttpErrorResponse) => {
          this.commonService.showeNotiResult('Sửa bài test thất bại', 2000);
        },
        complete: async () => {
          this.commonService.showeNotiResult('Sửa bài test thành công', 2000);
          this.returnList();
        },
      })
    }else{
      this.testService.submitTest(this.formData).subscribe({
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

  }

  validate() {
    if(!this.testName){
      this.formErrors.testName = 'Tên test không được để trống'
    }

    if(!this.testCategoryId){
      this.formErrors.testCategory = 'Vui lòng chọn loại đề thi'
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionListSelected, event.previousIndex, event.currentIndex);
  }

  returnList() {
    this.router.navigate(['/admin/tests']);
  }

  selectFile(event: any) {
    this.fileValue = event.target.files[0];
    if (this.fileValue) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.fileValue);
    }
  }
}

