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

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent implements OnInit {
  formSearch!: FormGroup;
  users: any;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private commonService: CommonServiceShared

  ) {
    this.formSearch = this.fb.group({
      keyWord: [''],
    });
  }

  async ngOnInit() {
    const res: any = await this.userService.getAllUser();

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
}
