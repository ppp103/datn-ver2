import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuestionService } from '../../../../services/question/question.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Choice } from '../../../../models/choice';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonServiceShared } from '../../../../services/base/common-service.service';

@Component({
  selector: 'app-manage-question-io',
  templateUrl: './manage-question-io.component.html',
  styleUrl: './manage-question-io.component.scss',
})
export class ManageQuestionIoComponent {
  inputModel: any;
  createForm!: FormGroup;
  dataChanged: any = false;
  multipleChoice: Choice[] = [
    {
      choiceText: '',
      isCorrected: 1,
    },
    {
      choiceText: '',
      isCorrected: 0,
    },
  ];
  test: any;
  formErrors = {
    ChuDeId: '',
    Content: '',
    LoaiCauId: '',
    Option1: '',
    Option2: '',
    Option3: '',
    Option4: '',
  };

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageQuestionIoComponent>,
    private commonService: CommonServiceShared,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.fb.group({
      ChuDeId: [''],
      Content: [''],
      LoaiCauId: ['1'],
      Explaination: [''],
    });
  }

  async ngOnInit() {
    if (this.data.item != null) {
      this.mapObjToForm();
    }
  }

  mapObjToForm() {
    console.log(this.data.item);
    this.createForm.setValue({
      ChuDeId: this.data.item.chuDeId,
      Content: this.data.item.content,
      LoaiCauId: this.data.item.loaiCauId,
      Explaination: this.data.item.explaination,
    });
  }

  onSaveAndClose() {}

  onToggle(e: any) {}

  closeModal() {
    this.dialogRef.close(this.dataChanged);
  }

  changeChoiceMC(i: number) {
    this.multipleChoice.map((item) => (item.isCorrected = 0));
    this.multipleChoice[i].isCorrected = 1;
  }

  addMCAnswer() {
    this.validate();
    if (this.multipleChoice.length >= 4) {
      return;
    }
    const newAnswer = new Choice(``, 0);
    this.multipleChoice.push(newAnswer);
    this.createForm.addControl(
      `option${this.multipleChoice.length}`,
      new FormControl('')
    );
  }

  validate(): boolean {
    let isValid = true;
    const formValue = this.createForm.value;

    const hasEmptyTextChoice = this.multipleChoice.some(
      (choice) => choice.choiceText === ''
    );

    const hasDuplicates = this.multipleChoice.some(
      (choice, index) =>
        this.multipleChoice.findIndex(
          (c) => c.choiceText === choice.choiceText
        ) !== index
    );

    if (!formValue.ChuDeId) {
      this.formErrors.ChuDeId = 'Vui lòng chọn chủ đề';
      isValid = false;
    } else {
      this.formErrors.ChuDeId = '';
      isValid = true;
    }

    if (!formValue.Content) {
      this.formErrors.Content = 'Nội dung câu hỏi không được để trống';
      isValid = false;
    } else {
      this.formErrors.Content = '';
      isValid = true;
    }

    if (hasEmptyTextChoice) {
      this.commonService.showeNotiResult(
        'Vui lòng điền đầy đủ các đáp án',
        2000
      );
      isValid = false;
    } else {
      isValid = true;
    }

    if (hasDuplicates) {
      this.commonService.showeNotiResult(
        'Các đáp án không được trùng nhau',
        2000
      );
      isValid = false;
    } else {
      isValid = true;
    }

    return isValid;
  }

  removeMCChoice(i: number) {
    this.multipleChoice.splice(i, 1);
    this.createForm.removeControl(`option${i + 1}`);
    if (this.multipleChoice.length >= 2) {
      this.multipleChoice[0].isCorrected = 1;
    }
  }

  onSubmit() {
    this.multipleChoice.forEach((choice, index) => {
      console.log(choice.choiceText);
      this.createForm.value[`option${index + 1}`] = choice.choiceText;
      if (choice.isCorrected) {
        this.createForm.value.correctOption = choice.choiceText;
      }
    });
    if (this.validate()) {
      this.inputModel = this.createForm.value;

      this.questionService.addQuestion(this.inputModel).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error: HttpErrorResponse) => {
          this.commonService.showeNotiResult(
            'Thêm mới thất bại! Vui lòng thử lại sau',
            2000
          );
        },
        complete: () => {
          this.commonService.showeNotiResult('Thêm mới thành công', 2000);
          this.dataChanged = true;
          this.closeModal();
        },
      });
    }
  }
}
