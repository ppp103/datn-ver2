import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { CommonServiceShared } from '../../../../services/base/common-service.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-user-io',
  templateUrl: './manage-user-io.component.html',
  styleUrl: './manage-user-io.component.scss'
})
export class ManageUserIoComponent {
  createForm!: FormGroup
  user: any;

  constructor(
    private userService: UserService,
    private commonService: CommonServiceShared,
    private authService : AuthService,
    private dialogRef: MatDialogRef<ManageUserIoComponent>,

  ){
    this.user = this.authService.getUserDataFromLocal();

  }

  onSubmit(){

  }

  updatePassword(event: any){
    this.userService.updatePasswordAdmin(
      { id: this.user.Id, 
        newPassword: event.newPassword
      }).subscribe({
        next: (res) => {
            this.commonService.showeNotiResult(res.message, 2000);
            this.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.commonService.showeNotiResult(
            'Lỗi hệ thống! Vui lòng thử lại sau!',
            2000
          );
        },
      }
    );
  }
  
  closeModal() {
    this.dialogRef.close();
  }
 
}
