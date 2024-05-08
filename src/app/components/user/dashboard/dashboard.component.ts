import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { Constant } from '../../../constants/constants';
import { AuthService } from '../../../services/auth/auth.service';
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
  user: any;
  pagging: any;

  constructor(
    private testService: TestService,
    private praticeTestService: PracticeTestService,
    private authService: AuthService
  ){
    
  }
  async ngOnInit() {
    const res: any = await this.testService.getAllTest({PageSize: -1, PageNumber: 1});
    this.examList = res.items.slice(0,4)
    this.user = this.authService.getUserDataFromLocal();

    this.loadData();
    // const resPracticeTest: any = await this.praticeTestService.getPracticeTestByTypeId({id: this.user.Id, type: Constant.PracticeTestType.UserId})
    // this.totalLastestTests = resPracticeTest.items.length;
    // this.lastestTests = resPracticeTest.items.splice(0, 4);
  }

  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

  async loadData(skip: number = 0, take: number = 4) {
    let state: any = { skip, take, action: { requestType: 'searching' } };

    this.praticeTestService.getPracticeTestByTypeId(state, {PageNumber:1, TypeId: this.user.Id, Type: Constant.PracticeTestType.UserId});

    this.praticeTestService.subscribe((res: any) => {
      this.pagging = res;
      if (res.result) {
        this.lastestTests = res.result;
        this.totalLastestTests = res.result.paging.totalItems
        // this.clearTabHeadLine(this.questions);
      }
    });
  }

}
