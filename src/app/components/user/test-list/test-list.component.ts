import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent implements OnInit{
  examList: any;
  pagging: any;
  constructor(
    private testService: TestService,
  ){
    this.loadData();
  }

    async loadData(skip: number = 0, take: number = 10) {
    let state: any = { skip, take, action: { requestType: 'searching' } };
    this.testService.getPaggingData(state);

    this.testService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.examList = res.result;
      }
    });
  }

  ngOnInit() {
    
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

}
