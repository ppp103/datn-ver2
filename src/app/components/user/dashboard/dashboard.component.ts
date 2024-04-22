import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
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

  constructor(
    private testService: TestService,
  ){
    
  }
  async ngOnInit() {
    const res: any = await this.testService.getAllTest({PageSize: 4, PageNumber: 1});
    this.examList = res.items
  }
}
