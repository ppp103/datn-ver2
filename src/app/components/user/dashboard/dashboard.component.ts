import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { Constant } from '../../../constants/constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  examList: any;
  listComing: any;
  skeletonLoading: any;
  listComplete: any;
  currentDate = new Date();
  lastestTests: any;
  totalLastestTests: any;
  userId = 1;
  totalTest: any;
  constructor(
    private testService: TestService,
    private praticeTestService: PracticeTestService
  ){
    
  }
  async ngOnInit() {
    const res: any = await this.testService.getAllTest({PageSize: 4, PageNumber: 1});
    this.totalTest = res.paging.totalItems
    this.examList = res.items

    const resPracticeTest: any = await this.praticeTestService.getPracticeTestByTypeId({id: this.userId, type: Constant.PracticeTestType.UserId})
    this.totalLastestTests = resPracticeTest.length;
    this.lastestTests = resPracticeTest.splice(0, 4);
  }
}
