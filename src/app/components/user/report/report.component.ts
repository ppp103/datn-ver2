import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../../../services/chart/chart.service';
import { ReportService } from '../../../services/report/report.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatisticItem } from '../../../models/statistic';
import { PracticeTestService } from '../../../services/practice-test/practice-test.service';
import { Constant } from '../../../constants/constants';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{
  @ViewChild('chart') chart!: ElementRef;
  // public chartOptions!: Partial<ChartOptions>;
  selectedTime: any;
  defaultTime: any;
  reports: any;
  user: any; 
  skeletonLoading: any;
  lastestTests: any;
  totalLastestTests: any;
  currentDate = new Date();
  pagging: any;
  time: any = 30;

  constructor(
    private chartService : ChartService,
    private reportService : ReportService,
    private authService : AuthService,
    private praticeTestService: PracticeTestService,
  ){
  }
  async ngOnInit() {
    this.user = this.authService.getUserDataFromLocal();
    this.getStatisticByUser(this.time);

    // const resPracticeTest: any = await this.praticeTestService.getPracticeTestByTypeId({id: this.user.Id, type: Constant.PracticeTestType.UserId})
    // this.totalLastestTests = resPracticeTest.paging.otalItems;
    // this.lastestTests = resPracticeTest.items;
    this.loadData();
  }

  onTimeChange(e: any){
    // console.log(e.target.value);
    this.time = e.target.value;
    this.getStatisticByUser(this.time)
  }
  
  seriesthongKeKetQuaLuyenThiCaNhanChart = [{
    name: 'Tỷ lệ trả lời đúng',
    data: [],
    fillColor: 'rgb(140,180,200)',
    lineColor: 'rgb(120,160,180)',
    color: 'rgb(140,180,200)',
  }];

  async getStatisticByUser(time: any) {
    let dates: any = [];
    this.seriesthongKeKetQuaLuyenThiCaNhanChart[0].data = [];

    const result: any  = await this.reportService.getStatisticByUser({userId: this.user.Id, time: time });
    if(result){
      this.reports = result.result;
    }
    console.log(this.reports);
    if (this.reports.correctPercentage) {
      result.result.correctPercentage.forEach((item : StatisticItem) => {
        dates.push(item.label)
        this.seriesthongKeKetQuaLuyenThiCaNhanChart[0].data.push(item.quantity);
      })
    }
    // if(this.reports.correctPercentageByTopicAndUser){
    //   this.reports = result.result.correctPercentageByTopicAndUser;
    // }
    this.chartService.thongKeKetQuaLuyenThiCaNhanChart("thongKeKetQuaLuyenThiCaNhanChart", this.seriesthongKeKetQuaLuyenThiCaNhanChart, dates);
  }
  
  onChangePage(args: any) {
    this.loadData(args.skip, args.take);
  }

    async loadData(skip: number = 0, take: number = 4) {
    let state: any = { skip, take, action: { requestType: 'searching' } };

    this.praticeTestService.getPracticeTestByTypeId(state, {PageNumber:1, TypeId: this.user.Id, Type: Constant.PracticeTestType.UserId});

    this.praticeTestService.subscribe((res: any) => {
      this.pagging = res;
      console.log(res);
      this.totalLastestTests = res.pagging.totalItems
      if (res.result) {
        this.lastestTests = res.result;
      }
    });
  }
}
