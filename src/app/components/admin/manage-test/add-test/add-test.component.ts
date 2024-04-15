import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from '../../../../services/topics/topic.service';
import { QuestionService } from '../../../../services/question/question.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  questions: any;

  formSearch = {
    ChuDeId: '',
    DifficultyLevel: ''
  };
  questionListSelected: any = [];
  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private questionService: QuestionService

  ) {}

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
    this.loadData()
    this.loadTopic()
  }

  async loadTopic() {
    this.topics = await this.topicService.getFetchAll();
    this.fields = { dataSource: this.topics, value: 'id', text: 'name', child: 'child' }

  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.questionService.getPaggingData(state, {...this.formSearch});

    this.questionService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.questions = res.result;
        //////////////////// test data
        this.questionListSelected = res.result
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

  valueChange(e: any){
    console.log(e.target.value);
  }

  addSelectedQuestion(){
    this.questionListSelected = this.questions.filter((question : any) => question.isSelected == true )
    console.log(this.questionListSelected);
  }

  removeSelectedQuestion(ques: any) {
    const index = this.questionListSelected.findIndex((item:any) => item.id === ques.id);
    this.questionListSelected.splice(index, 1);
    ques.isSelected = !ques.isSelected;
  }
  onSubmit() {}
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.questionListSelected,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }

  // filterChange(e: any){
  //   console.log(e);
  //   if(e.itemData){
  //     this.formSearch.ChuDeId = e.itemData.id
  //   }


  //   if(e.target){
  //     this.formSearch.DifficultyLevel = e.target.value
  //   }

  //   this.loadData();
  // }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionListSelected, event.previousIndex, event.currentIndex);
  }
}
