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
import { QuestionCategoryService } from '../../../../services/question-category/question-category.service';
import { closeFilterDialog } from '@syncfusion/ej2-angular-grids';
import { QTYPE } from '../../../../enum/enum';
@Component({
  selector: 'app-manage-question-io',
  templateUrl: './manage-question-io.component.html',
  styleUrl: './manage-question-io.component.scss',
})
export class ManageQuestionIoComponent {
  inputModel: any;
  createForm!: FormGroup;
  dataChanged: any = false;
  editMode: boolean = false;
  currentQuestionType: any;
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
  
  formErrors = {
    ChuDeId: '',
    Content: '',
    LoaiCauId: '',
    Option1: '',
    Option2: '',
    Option3: '',
    Option4: '',
  };
  questionCategories: any;

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageQuestionIoComponent>,
    private commonService: CommonServiceShared,
    private questionCategoryService: QuestionCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
    this.formInit();
    console.log(this.createForm.value);
    if (this.data.item != null) {
      this.editMode = true;
      this.mapObjToForm();
    }
    this.loadQuestionCategory();

  }

  changeQuestionType(id: number){
    this.currentQuestionType = id;
  }

  formInit() {
    this.createForm = this.fb.group({
      ChuDeId: [''],
      Content: [''],
      LoaiCauId: [''],
      Explaination: [''],
    });
  }
  
  async loadQuestionCategory() {
    this.questionCategories = await this.questionCategoryService.getFetchAll();
    console.log(this.questionCategories);
  }

  mapObjToForm() {
    this.createForm.setValue({
      ChuDeId: this.data.item.chuDeId,
      Content: this.data.item.content,
      LoaiCauId: this.data.item.loaiCauId,
      Explaination: this.data.item.explaination,
    });
    this.multipleChoice = []
    for (let i = 1; i <= 4; i++) {
      const optionKey = `option${i}`;
      if (this.data.item[optionKey] !== null) {
        this.multipleChoice.push({
          choiceText: this.data.item[optionKey],
          isCorrected: this.data.item[optionKey] === this.data.item.correctOption ? 1 : 0
        });
      }
    }
            
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
    console.log(this.editMode);
    this.multipleChoice.forEach((choice, index) => {
      this.createForm.value[`option${index + 1}`] = choice.choiceText;
      if (choice.isCorrected) {
        this.createForm.value.correctOption = choice.choiceText;
      }
    });
    if (!this.validate()) return;
    if(this.editMode){
      this.inputModel = this.createForm.value;
      this.inputModel.id = this.data.item.id;
      this.questionService.updateQuestion(this.inputModel).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error: HttpErrorResponse) => {
          this.commonService.showeNotiResult(
            'Sửa thất bại! Vui lòng thử lại sau',
            2000
          );
        },
        complete: () => {
          this.commonService.showeNotiResult('Sửa câu hỏi thành công', 2000);
          this.dataChanged = true;
          this.closeModal();
        },
      });
    }else{
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
          this.commonService.showeNotiResult('Thêm mới thành công',  2000);
          this.dataChanged = true;
          this.closeModal();
        },
      });
    }
  }
}
