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
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ManageQuestionIoComponent } from './manage-question/manage-question-io/manage-question-io.component';
import { QuestionDetailComponent } from './manage-question/question-detail/question-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTestComponent } from './manage-test/add-test/add-test.component';
import { DetailTestComponent } from './manage-test/detail-test/detail-test.component';
import { UserTestComponent } from './manage-test/user-test/user-test.component';
import { UserTestResultComponent } from './manage-test/user-test-result/user-test-result.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
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
    ManageQuestionIoComponent,
    QuestionDetailComponent,
    AddTestComponent,
    DetailTestComponent,
    UserTestComponent,
    UserTestResultComponent,
    AddTestComponent,
    DetailTestComponent,
    UserTestComponent,
    UserTestResultComponent,
    ManageTestComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    GridModule,
    MatDialogModule,
  ],
})
export class AdminModule {}
