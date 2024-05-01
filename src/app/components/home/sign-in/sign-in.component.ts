import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { validationAllErrorMessagesService } from '../../../services/validator/validator.service';

@Component({
  selector: 'app-sign-in',
  // standalone: false,
  // imports: [CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  loginForm!: FormGroup
  isShowPassword: boolean = true;
  openTab: any = 1;
  formErrors = {
    userName: "",
    password: "",
  }
  validationErrorMessages = {};

  constructor(
    private authService : AuthService,
    private fb : FormBuilder
  ){

  }

  ngOnInit(){
    this.formInit()
    this.setValidation();
  }

  formInit() {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })
      // this.loginForm.get('userName')?.valueChanges.subscribe(value => {
      //   // PerloginForm validation or other actions as the user types
      //   if (value.length == 0) {
      //     this.loginForm.get('userName')?.setErrors({ required: true });
      //   } else {
      //     this.loginForm.get('userName')?.setErrors(null);
      //   }
      // });

      // this.loginForm.get('password')?.valueChanges.subscribe(value => {
      //   // PerloginForm validation or other actions as the user types
      //   if (value.length == 0) {
      //     this.loginForm.get('password')?.setErrors({ required: true });
      //   } else {
      //     this.loginForm.get('password')?.setErrors(null);
      //   }
      // });
  }
  
  setValidation() {
    this.validationErrorMessages = {
      userName: {
        required: "Tên đăng nhập không được để trống",
      },
      password: {
        required: "Mật khẩu không được để trống",
      },
    };
  }

  public logAllValidationErrorMessages() {
    validationAllErrorMessagesService(
      this.loginForm,
      this.validationErrorMessages,
      this.formErrors
    );
  }

  changeTab(){
    this.openTab = 2;
    if(this.openTab == 2){
      console.log(this.openTab);
    }
  }

  login(){
    this.logAllValidationErrorMessages();
    if (this.loginForm.valid) {
      let inputModel = {
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      }

      this.authService.login(inputModel)
    }
  }
  togglePassword(){
    this.isShowPassword = !this.isShowPassword
  }
}
