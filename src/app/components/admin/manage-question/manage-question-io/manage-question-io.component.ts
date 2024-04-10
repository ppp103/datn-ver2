import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuestionService } from '../../../../services/question/question.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Choice } from '../../../../models/choice';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceShared } from '../../../../services/base/common-service.service';

@Component({
  selector: 'app-manage-question-io',
  templateUrl: './manage-question-io.component.html',
  styleUrl: './manage-question-io.component.scss'
})
export class ManageQuestionIoComponent {
  inputModel: any;
  createForm !: FormGroup
  dataChanged: any
  multipleChoice: Choice[] = [
    {
      choiceText: '',
      isCorrected: 1
    },
    {
      choiceText: '',
      isCorrected: 0
    }
  ];
  test: any;
  constructor(private questionService: QuestionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageQuestionIoComponent>,
    private commonService: CommonServiceShared
  ) {
    this.createForm = this.fb.group({
      ChuDeId: [""],
      Content: [""],
      LoaiCauId: ["1"],
      Explaination: [""],
      // Option1: [""],
      // Option2: [""],
      // Option3: [""],
      // Option4: [""],

    });

    // this.multipleChoice.forEach((choice, index) => {
    //   this.createForm.addControl(`option${index + 1}`, new FormControl(choice.choiceText));
    // });
  }
  onSaveAndClose(){

  }

  onToggle(e: any){

  }

  closeModal(){
    this.dialogRef.close(this.dataChanged);
  }

  changeChoiceMC(i: number) {
    this.multipleChoice.map(item => item.isCorrected = 0);
    this.multipleChoice[i].isCorrected = 1;
  }

  addMCAnswer() {
    if(this.multipleChoice.length >= 4){
      return;
    }
    const newAnswer = new Choice(``, 0);
    this.multipleChoice.push(newAnswer);
    this.createForm.addControl(`option${this.multipleChoice.length}`, new FormControl(''));
  }

  removeMCChoice(i: number) {
    this.multipleChoice.splice(i, 1);
    this.createForm.removeControl(`option${i + 1}`);
    if (this.multipleChoice.length >= 2) {
      // this.selectedMCAnswer = this.multipleChoice[0].choiceText;
      this.multipleChoice[0].isCorrected = 1;
    }
  }

  onSubmit(){
    console.log(this.multipleChoice);

    this.multipleChoice.forEach((choice, index) => {
      console.log(choice.choiceText);
      this.createForm.value[`option${index + 1}`] = choice.choiceText;
      if(choice.isCorrected){
        this.createForm.value.correctOption = choice.choiceText
      }
    })
    console.log(this.createForm.value);
    
    this.inputModel = this.createForm.value;
  //   this.questionService.createQuestion(this.inputModel).subscribe(res => {
  //     console.log(res);
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // );
  this.questionService.addItem(this.inputModel).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (error: HttpErrorResponse) => {
      console.log(error);
    },
    complete: () => {
      this.commonService.showeNotiResult('Thêm mới thành công', 2000);
    }
  });
  
  }
}
