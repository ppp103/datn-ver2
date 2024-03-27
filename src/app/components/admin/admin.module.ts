import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { CardStatsComponent } from './card-stats/card-stats.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminFooterComponent,
    CardStatsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
