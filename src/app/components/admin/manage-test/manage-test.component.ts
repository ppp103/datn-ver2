import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTestComponent } from './add-test/add-test.component';

@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrl: './manage-test.component.css',
})
export class ManageTestComponent implements OnInit {
  examList: any;
  pagging: any;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.testService.getPaggingData(state, {});

    this.testService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.examList = res.result;
        this.clearTabHeadLine(this.examList);
      }
    });
  }

  clearTabHeadLine(data: any) {
    data.forEach((el: any) => {
      if (el.content) {
        el.sumaryContent = el.content.replace(/\&nbsp;/g, '');
      }
    });
  }

  goDeTail(id: any) {
    this.router.navigate([`/admin/tests/${id}`]);
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  toAddPage(){
    // this.router.navigate(['/admin/tests/add-test'])
    window.location.href = '/admin/tests/add-test'
  }
}
