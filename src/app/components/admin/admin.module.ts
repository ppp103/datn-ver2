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
import { ManageTestComponent } from './manage-test/manage-test.component';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
// import { LineChartComponent } from './line-chart/line-chart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserTestComponent } from './manage-test/user-test/user-test.component';
import { UserTestResultComponent } from './manage-test/user-test-result/user-test-result.component';
import { TestResultComponent } from '../user/test-result/test-result.component';
import { ManageSubjectIoComponent } from './manage-subject/manage-subject-io/manage-subject-io/manage-subject-io.component';
import { ManagePartComponent } from './manage-subject/manage-part/manage-part.component';
import { QuestionsBySubjectComponent } from './manage-subject/questions-by-subject/questions-by-subject/questions-by-subject.component';
import { PreviewTestComponent } from './manage-test/preview-test/preview-test.component';
import { ManageUserIoComponent } from './manage-user/manage-user-io/manage-user-io.component';

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
    AddTestComponent,
    DetailTestComponent,
    UserTestComponent,
    UserTestResultComponent,
    ManageTestComponent,
    ManageSubjectIoComponent,
    ManagePartComponent,
    QuestionsBySubjectComponent,
    PreviewTestComponent,
    ManageUserIoComponent,
    // TestResultComponent
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
    DropDownTreeModule,
    DragDropModule,
  ],
})
export class AdminModule {}
