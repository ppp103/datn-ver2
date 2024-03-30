import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  formSearch!: FormGroup;
  constructor(private fb: FormBuilder) {
    // this.formSearch = this.fb.group({
    //   // Define your form controls here
    //   // For example:
    //   keyWord: ['', Validators.required],
    //   // Add more form controls as needed
    // });
  }
}
