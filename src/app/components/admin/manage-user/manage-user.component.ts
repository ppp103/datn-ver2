import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageUserIoComponent } from './manage-user-io/manage-user-io.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent implements OnInit {
  formSearch!: FormGroup;
  users: any;
  selectedItem: any;
  dialogRef!: MatDialogRef<any>;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private commonService: CommonServiceShared,
    private dialog: MatDialog,

  ) {

  }

  ngOnInit() {
    this.formInit();
    this.getAllUser();
  }

  formInit(){
    this.formSearch = this.fb.group({
      keyWord: [''],
    });
  }

  async getAllUser(){
    const res: any = await this.userService.getAllUser({...this.formSearch.value});

    if(res){
      console.log(res.items);
      res.items.map((item: any, index: number) => {
        item.serialNumber = index + 1;
      })
      this.users = res.items;
    }
  }

  goDeTail(id: number){

  }

  /**
   * Hàm hiển thị Dialog xác nhận khi người dùng thay đổi trạng thái hoạt động
   * @param e 
   */
  onToggle(e: any, data: any) {
    // Chặn việc click vào toggle thì nó chuyển luôn
    e.preventDefault();

    // Hiển thị dialog
    let result = this.commonService.confirmDiaLogService('Cảnh báo', 'Bạn chắc chắn muốn thay đổi trạng thái chứ?', '');
    // Nếu người dùng ấn nút xác nhận thì chuyển trạng thái toggle và trạng thái data
    result.afterClosed().subscribe((res) => {
      if (res === 'confirm') {
        // Chuyển trạng thái data
        // Vừa chuyển đổi trạng thái vừa convert sang kiểu số
        // Ví dụ: Nếu trạng thái đang là true thì thành false = 0
        data.isActive = data.isActive ? 0 : 1;

        // Gọi api sửa
        this.userService.updateUserStatus({ id: data.id, isActive: data.isActive}).subscribe((res:any) => {
          console.log(res);
        },
          (error: HttpErrorResponse) => {
            this.commonService.showeNotiResult('Cập nhật trạng thái thất bại', 2000);
          },
          () => {
            this.commonService.showeNotiResult(
              'Cập nhật trạng thái thành công', 2000)
          }
        )
      } else {
        return;
      }
    })
  }

  refresh(){
    this.formInit();
    this.getAllUser();
  }

  async getItemByEvent(id: any, mode = 'edit'){
        console.log(id);
    this.selectedItem = await firstValueFrom(
      this.userService.getUserById(id)
    );
    if (mode === 'edit') {
      this.openAddForm(this.selectedItem, mode);
    } else if (mode === 'delete') {
      let result = this.commonService.confirmDiaLogService(
        'Cảnh báo',
        `Bạn chắc chắn muốn xóa câu hỏi ${this.selectedItem.content} chứ?`,
        ''
      );
      // Nếu người dùng ấn nút xác nhận thì xóa và cập nhật lại data
      result.afterClosed().subscribe(async (res) => {
        if (res === 'confirm') {
          // Xóa
          this.userService.deleteUser(this.selectedItem.id).subscribe({
            next: (res: any) => console.log(res),
            error: (error: HttpErrorResponse) => {
              console.log(error);
              this.commonService.showeNotiResult(error.error.DevMessage, 2000);
            },
            complete: async () => {
              this.commonService.showeNotiResult('Xoá thành công', 2000);
              // Update data
              await this.getAllUser();
            },
          });
        } else {
          return;
        }
      });
    }
  } 

  
  openAddForm(item: any, status: any) {
    this.dialogRef = this.dialog.open(ManageUserIoComponent, {
      data: { item: item, status: status },
    });
    this.dialogRef.afterClosed().subscribe(async (dataChanged) => {
      if (dataChanged) {
        await this.getAllUser();
      }
    });
  }

}
