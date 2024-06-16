import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  // standalone: true,
  // imports: [RouterModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit{
  fEmail!: FormGroup;
  
  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private commonService: CommonServiceShared,
    private router: Router
  ){

  }

  get email() {
    return this.fEmail.get('email');
  }

  ngOnInit(): void {
    this.fEmail = this.fb.group({
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    });
  }
  
  onSubmitEmail() {
    console.log('send email');
    this.userService.forgetPassword({email: this.email?.value}).subscribe((res: any) => {
      console.log(res);
      this.commonService.showeNotiResult(res.message, 2000)
      if(res.flag){
        this.router.navigate([`/sign-in`]);
      }
    })
  }
}
