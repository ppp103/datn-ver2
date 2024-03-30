import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { CardStatsComponent } from './card-stats/card-stats.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageSubjectComponent } from './manage-subject/manage-subject.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
// import { LineChartComponent } from './line-chart/line-chart.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminFooterComponent,
    CardStatsComponent,
    NavSidebarComponent,
    NavbarComponent,
    AdminComponent,
    UserDropdownComponent,
    ManageSubjectComponent,
    ManageUserComponent,
    ManageQuestionComponent,
    AdminProfileComponent,
    CardStatsComponent,
    // LineChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
