import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrl: './add-test.component.scss',
})
export class AddTestComponent implements OnInit {
  createForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm = this.fb.group({
      testName: [''],
      time: [''],
    });
  }

  removeSelectedQuestion(question: any) {}
  onSubmit() {}
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.questionListSelected,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
}
