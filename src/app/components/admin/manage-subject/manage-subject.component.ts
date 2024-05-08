import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topics/topic.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageSubjectIoComponent } from './manage-subject-io/manage-subject-io/manage-subject-io.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestionService } from '../../../services/question/question.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrl: './manage-subject.component.scss'
})
export class ManageSubjectComponent implements OnInit{
  topics: any;
  dialogRef!: MatDialogRef<any>;
  selectedUpdateId: any;
  topicName: any;
  isPartPage: any;
  parentTopicId: any;
  constructor(
    private topicService : TopicService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private location : Location
  ){
  }
  ngOnInit() {
    this.checkParams();
    this.loadData();
    console.log(this.topics);
  }

  checkParams(): void {
  this.route.params.subscribe(params => {
    this.isPartPage = params.hasOwnProperty('topicId') ? true : false 
    if(this.isPartPage){
      this.parentTopicId = Number(this.route.snapshot.paramMap.get('topicId'));
    }

    console.log(this.isPartPage, "part page");

  });
}

  async loadData(){
    let res: any;
    if(this.isPartPage == false){
      res = await this.topicService.getFlatList(0);
      console.log(res);
      this.topics = res.filter((topic:any) => topic.parentId == null || topic.parentId == 0)
      return;
    }

    // Nếu là sub-subject
    if(this.parentTopicId){
      res = await this.topicService.getFlatList(this.parentTopicId)
      this.topics = res
    }
  }

  toggleInput(topic: any) {
    this.selectedUpdateId = topic.id;
    this.topicName = topic.name;
  }

  updateTopic(id: any){
    this.topicService.updateTopic({id: id, name: this.topicName, parentId: this.parentTopicId ? this.parentTopicId : null}).subscribe((res) => {
      this.selectedUpdateId = -1;
      this.loadData();
    })
  }

  openAddForm(item: any, status: any){
    console.log(item);
    this.dialogRef = this.dialog.open(ManageSubjectIoComponent, {
      data: { item: item, topicParentId: this.parentTopicId },
    });
    this.dialogRef.afterClosed().subscribe(async (dataChanged) => {
      if (dataChanged) {
        await this.loadData();
      }
    });
  }

  goToQuestionBySubject(id: number){
    this.router.navigate([`/admin/subjects/${id}/questions`])
  }

  goBack() {
    this.location.back();
  }

}
