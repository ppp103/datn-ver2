import * as Highcharts from "highcharts";
import { Injectable } from '@angular/core';
import More from 'highcharts/highcharts-more';
import Drilldown from 'highcharts/modules/drilldown';
import Exporting from 'highcharts/modules/exporting';

// Setting hightcharts
More(Highcharts);
Drilldown(Highcharts);
Exporting(Highcharts);

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {
    this.thongKeKetQuaLuyenThiCaNhanChart = this.thongKeKetQuaLuyenThiCaNhanChart.bind(this);
  }

  getSubtitle() {
    return `<span style="font-size: 30px">200</span>`;
  }

  /**
* Hiển thị biểu đồ thống kê lượt truy cập
* Chú ý: thuộc tính "series".
* @param container Element id để render biểu đồ
*/
  thongKeKetQuaLuyenThiCaNhanChart(container: any, series: any, dates: any) {
    let chart: any = Highcharts.chart(container, {
      title: {
        text: '',
        align: 'left'
      },
      lang: {
        viewFullscreen: 'Xem toàn màn hình',
        exitFullscreen: 'Thu nhỏ',
        contextButtonTitle: 'Menu',
        printChart: 'In biểu đồ',
        downloadPNG: 'Tải xuống PNG',
        downloadJPEG: 'Tải xuống JPEG',
        downloadPDF: 'Tải xuống PDF',
        downloadSVG: 'Tải xuống SVG',
        drillUpText: '< Trở về'
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: '%'
        },
      },
      xAxis: {
        title: {
            text: 'Ngày làm'
        },
        categories: dates
      },
      legend: {
        enabled: true,
        title: {
          text: '<span style="font-size: 12px; color: #666; ' +
                'font-weight: normal">(Nhấn để ẩn)</span>',
          style: {
              fontStyle: 'italic'
          }
        },
      },
      series: series,
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{y} %'
            }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    } as any);
  }

}