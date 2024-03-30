import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  formSearch!: FormGroup;
  toppings = new FormControl('');
  listData: any;
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  constructor(private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      keyWord: ['', Validators.required],
    });
  }
}
