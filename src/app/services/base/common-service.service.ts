import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyAlertDialogComponent } from '../../components/shared/my-alert-dialog/my-alert-dialog.component';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceShared {
    private datePipe!: DatePipe

  constructor(public snackBar: MatSnackBar, public modalDialog: MatDialog) {}

  // show notification
  public showeNotiResult(contentText: string, duration: number) {
    return this.snackBar.open(contentText, '', {
      // tslint:disable-next-line: object-literal-shorthand
      duration: duration,
    });
  }

  // confirm delete dialog
  public confirmDiaLogService(
    header: string,
    titleText: string,
    nameObj: string
  ) {
    const dialogRef = this.modalDialog.open(MyAlertDialogComponent);
    let nameObject = nameObj.replace(/\</g, '&lt;');
    nameObject = nameObject.replace(/\>/g, '&gt;');
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.content =
      titleText + ' <b>' + nameObject + '</b>';
    dialogRef.componentInstance.okeButton = 'Đồng ý';
    dialogRef.componentInstance.cancelButton = 'Huỷ';
    dialogRef.componentInstance.visibleOkButton = true;
    dialogRef.componentInstance.visibleCancelButton = true;
    return dialogRef;
  }

    public handleDatetime(datetime: string, format= 'HH:mm:ss yyyy-MM-dd'): string {
    if (datetime) {
      let result = this.datePipe.transform(datetime, format, '+0700');
      if(result){
        return result;
      }
    }
    return datetime;
  }
}
