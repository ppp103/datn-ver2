import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {UploadFileService} from '../../../_services/upload-file.service';
// import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {

  // imgUploadUrl: string;
  fileUpload: any;
  @Output() avatarUploadUrl = new EventEmitter<any>();
  @Output() saveImg = new EventEmitter<any>();

  selectedFiles: any;
  currentFileUpload: any;

  // constructor(
  //   private uploadService: UploadFileService,
  //   private toast: ToastrService) {
  // }

  ngOnInit(): void {
  }

  submitAvatar() {
    this.saveImg.emit(this.fileUpload);
    console.log(this.fileUpload);
  }

  selectFile(e: any) {
    this.selectedFiles = e.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.fileUpload = this.currentFileUpload;
    this.avatarUploadUrl.emit(this.fileUpload);

  }
}
