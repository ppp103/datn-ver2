import { Component } from '@angular/core';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { CommonModule } from '@angular/common';
import { CardStatsComponent } from '../card-stats/card-stats.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  statistics: any;
}
