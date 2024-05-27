import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-user-io',
  templateUrl: './manage-user-io.component.html',
  styleUrl: './manage-user-io.component.scss'
})
export class ManageUserIoComponent {
  createForm!: FormGroup

  constructor(){

  }

  onSubmit(){

  }

  updatePassword(event: any){
    console.log(event);
  }
}
