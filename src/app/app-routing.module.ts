import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/home/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './components/home/forget-password/forget-password.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { TestDetailComponent } from './components/user/test-detail/test-detail.component';
import { TestQuestionComponent } from './components/user/test-question/test-question.component';
import { TestListComponent } from './components/user/test-list/test-list.component';
import { TestResultComponent } from './components/user/test-result/test-result.component';
import { ManageQuestionComponent } from './components/admin/manage-question/manage-question.component';
import { ManageTestComponent } from './components/admin/manage-test/manage-test.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageUserComponent } from './components/admin/manage-user/manage-user.component';
import { ManageSubjectComponent } from './components/admin/manage-subject/manage-subject.component';
import { QuestionDetailComponent } from './components/admin/manage-question/question-detail/question-detail.component';
import { DetailTestComponent } from './components/admin/manage-test/detail-test/detail-test.component';
import { AddTestComponent } from './components/admin/manage-test/add-test/add-test.component';
import { UserTestComponent } from './components/admin/manage-test/user-test/user-test.component';
import { UserTestResultComponent } from './components/admin/manage-test/user-test-result/user-test-result.component';
import { ReportComponent } from './components/user/report/report.component';
import { ManagePartComponent } from './components/admin/manage-subject/manage-part/manage-part.component';
import { QuestionsBySubjectComponent } from './components/admin/manage-subject/questions-by-subject/questions-by-subject/questions-by-subject.component';
import { IsGuarded } from './services/auth/auth-guard';
import { SignUpComponent } from './components/home/sign-up/sign-up.component';
import { IsLoginGuarded } from './services/auth/login-guard';
import { PreviewTestComponent } from './components/admin/manage-test/preview-test/preview-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    // canActivate: [IsLoginGuarded],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    // canActivate: [IsLoginGuarded],

  },
  
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    // canActivate: [IsLoginGuarded],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'questions',
        component: ManageQuestionComponent,
        data: { breadcrumb: 'Quản lý câu hỏi' },
      },
      {
        path: 'questions/:id',
        component: QuestionDetailComponent,
        data: { breadcrumb: 'Thông tin câu hỏi' },
      },
      {
        path: 'tests',
        component: ManageTestComponent,
        data: { breadcrumb: 'Quản lý đề thi' },
      },
      {
        path: 'tests/add-test',
        component: AddTestComponent,
        data: { breadcrumb: 'Tạo mới đề thi' },
      },
      {
        path: 'tests/edit-test/:id',
        component: AddTestComponent,
        data: { breadcrumb: 'Chỉnh sửa đề thi' },
      },
      {
        path: 'tests/:id',
        component: DetailTestComponent,
        data: { breadcrumb: 'Chi tiết đề thi' },
      },
      {
        path: 'tests/:id/preview',
        component: PreviewTestComponent,
        data: { breadcrumb: 'Mô phỏng' },
      },
      {
        path: 'tests/:id/users',
        component: UserTestComponent,
        data: { breadcrumb: 'Danh sách kết quả bài thi' },
      },
      {
        path: 'tests/:id/users/:practiceTest',
        component: UserTestResultComponent,
        data: { breadcrumb: 'Chi tiết kết quả bài thi' },
      },
      {
        path: 'users',
        component: ManageUserComponent,
        data: { breadcrumb: 'Quản lý người dùng' },
      },
      {
        path: 'subjects',
        component: ManageSubjectComponent,
        data: { breadcrumb: 'Quản lý chủ đề' },
      },
      {
        path: 'subjects/:topicId',
        component: ManageSubjectComponent,
        data: { breadcrumb: 'Quản lý chủ đề con' },
      },
      {
        path: 'subjects/:topicId/questions',
        component: ManageQuestionComponent,
        data: { breadcrumb: 'Câu hỏi theo chủ đề con' },
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [IsLoginGuarded],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Trang chủ' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Hồ sơ' },
      },
      {
        path: 'test',
        component: TestListComponent,
        data: { breadcrumb: 'Danh sách đề thi' },
        // children: [
        //   { 
        //     path: ':id', 
        //     component: TestDetailComponent, 
        //     data: { breadcrumb: 'Chi tiết đề thi' } },
        //   {
        //     path: ':id/start',
        //     component: TestQuestionComponent,
        //     data: { breadcrumb: 'Làm bài' },
        //   },
        //   {
        //     path: ':practiceTest/result',
        //     component: TestResultComponent,
        //     data: { breadcrumb: 'Kết quả' },
        //   },
        // ]
      },
      {
        path: 'report',
        component: ReportComponent,
        data: { breadcrumb: 'Báo cáo' },
      },
      { 
        path: 'test/:id', 
        component: TestDetailComponent, 
        data: { breadcrumb: 'Chi tiết đề thi' } },
      {
        path: 'test/:id/start',
        component: TestQuestionComponent,
        data: { breadcrumb: 'Làm bài' },
      },
      {
        path: 'test/:practiceTest/result',
        component: TestResultComponent,
        data: { breadcrumb: 'Kết quả' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
