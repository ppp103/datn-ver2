import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { AuthService } from '../../../services/auth/auth.service';
import { validationAllErrorMessagesService } from '../../../services/validator/validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  // standalone: true,
  // imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isShowPassword: boolean = true;
  isShowConfirmPassword: boolean = true;

  registerForm: any;

  passMatch: any;

  formErrors = {
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
  }

  validationErrorMessages = {};

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonServiceShared,
    private router: Router,
    private authenService: AuthService
  ) { }

    async ngOnInit() {
    this.formInit();
    this.setValidation();
  }

  formInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    })
  }

  setValidation() {
    this.validationErrorMessages = {
      email: {
        required: "Email không được để trống",
        email: 'Không đúng định dạng email'
      },
      userName: {
        required: "Tên đăng nhập không được để trống",
      },
      password: {
        required: "Mật khẩu không được để trống",
      },
      confirmPassword: {
        required: "Mật khẩu không được để trống",
      },
    };
  }

  public logAllValidationErrorMessages() {
    validationAllErrorMessagesService(
      this.registerForm,
      this.validationErrorMessages,
      this.formErrors
    );
  }

  register() {
    // validate
    this.logAllValidationErrorMessages();

    // check mật khẩu trùng nhau
    this.passMatch = this.registerForm.value.password == this.registerForm.value.confirmPassword ? true : false;
    
    this.authenService.register(this.registerForm.value);
  }

  togglePassword() {
    this.isShowPassword = !this.isShowPassword
  }

  toggleConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword
  }
}
