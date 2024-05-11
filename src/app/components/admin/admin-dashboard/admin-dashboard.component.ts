import { Component, OnInit } from '@angular/core';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { CardStatsComponent } from '../card-stats/card-stats.component';
import { ReportService } from '../../../services/report/report.service';
import { ChartService } from '../../../services/chart/chart.service';
import { StatisticItem } from '../../../models/statistic';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  statistics: any;

  seriesThongKeSoBaiLuyenTheoNgayChart = [{
    name: 'Số bài làm theo ngày',
    data: [],
    fillColor: 'rgb(140,180,200)',
    lineColor: 'rgb(120,160,180)',
    color: 'rgb(140,180,200)',
  }];

  constructor(
    private reportService: ReportService,
    private chartService: ChartService,
  ){

  }

  async ngOnInit() {
    const res: any = await this.reportService.getAdminStatistics();
    this.statistics = res.result;
    this.getStatistic();
  }

    async getStatistic() {
    let dates: any = [];
    this.seriesThongKeSoBaiLuyenTheoNgayChart[0].data = [];

    if (this.statistics) {
      this.statistics.practiceTestsChart.forEach((item : StatisticItem) => {
        dates.push(item.label)
        this.seriesThongKeSoBaiLuyenTheoNgayChart[0].data.push(item.quantity);
      })
    }
    // if(this.reports.correctPercentageByTopicAndUser){
    //   this.reports = result.result.correctPercentageByTopicAndUser;
    // }
    this.chartService.thongKeSoBaiLuyenTheoNgayChart("thongKeSoBaiLuyenTheoNgayChart", this.seriesThongKeSoBaiLuyenTheoNgayChart, dates);
  }
} 
