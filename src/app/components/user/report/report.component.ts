import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../../../services/chart/chart.service';
import { ReportService } from '../../../services/report/report.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatisticItem } from '../../../models/statistic';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  @ViewChild('chart') chart!: ElementRef;
  // public chartOptions!: Partial<ChartOptions>;
  selectedTime: any;
  defaultTime: any;
  user: any; 
  constructor(
    private chartService : ChartService,
    private reportService : ReportService,
    private authService : AuthService
  ){
  }
  ngOnInit(): void {
    this.user = this.authService.getUserDataFromLocal();
    this.getStatisticByUser(7);
  }
  
  seriesthongKeKetQuaLuyenThiCaNhanChart = [{
    name: 'Tỷ lệ trả lời đúng',
    data: []
  }];

  async getStatisticByUser(time: any) {
    let dates: any = [];
    this.seriesthongKeKetQuaLuyenThiCaNhanChart[0].data = [];

    const result: any  = await this.reportService.getStatisticByUser({userId: this.user.Id, time: time });
    if (result.result.correctPercentage) {
      result.result.correctPercentage.forEach((item : StatisticItem) => {
        dates.push(item.label)
        this.seriesthongKeKetQuaLuyenThiCaNhanChart[0].data.push(item.quantity);
      })
    }
    this.chartService.thongKeKetQuaLuyenThiCaNhanChart("thongKeKetQuaLuyenThiCaNhanChart", this.seriesthongKeKetQuaLuyenThiCaNhanChart, dates);
  }
}
