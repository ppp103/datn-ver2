import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from '../../../../../services/topics/topic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceShared } from '../../../../../services/base/common-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-subject-io',
  templateUrl: './manage-subject-io.component.html',
  styleUrl: './manage-subject-io.component.scss'
})
export class ManageSubjectIoComponent implements OnInit{
  topicName: any;
  dataChanged: any;
  formError: any;
  constructor(private fb : FormBuilder,
    private topicService: TopicService,
    private commonService: CommonServiceShared,
    private dialogRef: MatDialogRef<ManageSubjectIoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      console.log(data);
      console.log(data.topicParentId);
    }
  }
  ngOnInit(): void {
    this.formInit();
  }

  formInit() {

  }

  onSubmit(){
    this.topicService.createTopic({name: this.topicName, parentId: this.data.topicParentId}).subscribe( {
      next: (res) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        this.commonService.showeNotiResult(
          'Thêm thất bại! Vui lòng thử lại sau',
          2000
        );
      },
      complete: () => {
        this.commonService.showeNotiResult('Thêm chủ đề thành công', 2000);
        this.dataChanged = true;
        this.closeModal();
      },
    })
  }

  closeModal(){
    this.dialogRef.close(this.dataChanged)
  }
}
