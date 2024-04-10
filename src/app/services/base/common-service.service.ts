import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class CommonServiceShared {
    constructor(
        public snackBar: MatSnackBar,
    ){}

      // show notification
    public showeNotiResult(contentText: string, duration: number) {
        return this.snackBar.open(contentText, '', {
        // tslint:disable-next-line: object-literal-shorthand
        duration: duration,
        });
    }
}