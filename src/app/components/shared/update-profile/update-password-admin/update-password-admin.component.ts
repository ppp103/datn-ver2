import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-password-admin',
  templateUrl: './update-password-admin.component.html',
  styleUrl: './update-password-admin.component.scss'
})
export class UpdatePasswordAdminComponent {
  rfPassword: FormGroup;
  @Output() passwordUpdate = new EventEmitter<any>();
  hiddenOldPwd = true;
  hiddenNewPwd = true;
  hiddenConfirmPwd = true;

  constructor(private fb: FormBuilder) {
    this.rfPassword = new FormGroup({
      newPassword: new FormControl(null, Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')),
      confirmPassword: new FormControl(null)
    });
  }

  get newPassword() {
    return this.rfPassword.get('newPassword');
  }

  get confirmPassword() {
    return this.rfPassword.get('confirmPassword');
  }

  ngOnInit(): void {
    this.initFormChangePwd();
  }


  updatePassword() {
    const data = {newPassword: this.newPassword!.value};
    this.passwordUpdate.emit(data);
  }

  initFormChangePwd() {
    this.rfPassword = new FormGroup({
      newPassword: new FormControl(null, Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')),
      confirmPassword: new FormControl(null)
    });
  }

  passwordConfirming(c: AbstractControl): { passwordConfirming: boolean } {
    if (c.get('newPassword')!.value !== c.get('confirmPassword')!.value) {
      return {passwordConfirming: true};
    }

    return {passwordConfirming: false}
  }

  togglePwd(type: any) {
    switch (type) {
      case 'hiddenNewPwd': {
        this.hiddenNewPwd = !this.hiddenNewPwd;
        break;
      }
      case 'hiddenConfirmPwd': {
        this.hiddenConfirmPwd = !this.hiddenConfirmPwd;
        break;
      }
    }

  }

  clearForm(){
    this.rfPassword.reset();
  }
}
