import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topics/topic.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageSubjectIoComponent } from './manage-subject-io/manage-subject-io/manage-subject-io.component';

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

  constructor(
    private topicService : TopicService,
    private dialog: MatDialog,

  ){

  }
  ngOnInit() {
    this.loadData();
    console.log(this.topics);
  }

  async loadData(){
    const res: any = await this.topicService.getFlatList();
    this.topics = res.filter((topic:any) => topic.parentId == null
    )
  }

  toggleInput(topic: any) {
    this.selectedUpdateId = topic.id;
    this.topicName = topic.name;
  }

  updateTopic(id: any){
    this.topicService.updateTopic({id: id, name: this.topicName}).subscribe((res) => {
      this.selectedUpdateId = -1;
      this.loadData();
    })
  }

  openAddForm(item: any, status: any){
    this.dialogRef = this.dialog.open(ManageSubjectIoComponent, {
      data: { item: item, status: status },
    });
    this.dialogRef.afterClosed().subscribe(async (dataChanged) => {
      if (dataChanged) {
        await this.loadData();
      }
    });
  }
}
