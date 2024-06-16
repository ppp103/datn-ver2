import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
            //   next: (res) => console.log(res),
            // error: (error: HttpErrorResponse) => {
            //   console.log(error);
            //   this.commonService.showeNotiResult(error.error.DevMessage, 2000);
            // },
            // complete: async () => {
            //   this.commonService.showeNotiResult('Xoá thành công', 2000);
            //   // Update data
            //   await this.loadData();
            // },
  onSubmitEmail() {
    console.log('send email');
    // this.userService.forgetPassword({email: this.email?.value}).subscribe((res: any) => { 
    //   this.commonService.showeNotiResult(res.message, 2000)
    //   if(res.flag){
    //     this.router.navigate([`/sign-in`]);
    //   }
    // })
    let result: any;
    this.userService.forgetPassword({email: this.email?.value}).subscribe({
        next: (res) => {
          this.commonService.showeNotiResult(res.message, 2000);
          if(res.flag){
            this.router.navigate([`/sign-in`]);
          }
          result = res
        },
        error: (error: HttpErrorResponse) => {
          this.commonService.showeNotiResult(
            'Lỗi hệ thống! Vui lòng thử lại sau!',
            2000
          );
        },
        // complete: () => {
        //   this.commonService.showeNotiResult(result.message, 2000);
        //   if(result.flag){
        //     this.router.navigate([`/sign-in`]);
        //   }
        // }
      }
    )
  }
}
