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
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
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
        path: 'users',
        component: ManageUserComponent,
        data: { breadcrumb: 'Quản lý người dùng' },
      },
      {
        path: 'subjects',
        component: ManageSubjectComponent,
        data: { breadcrumb: 'Quản lý chủ đề' },
      },

      // { path: 'test/detail/:id', component: TestDetailComponent, data: { breadcrumb: 'Chi tiết đề thi' } },

      {
        path: 'test/detail/start',
        component: TestQuestionComponent,
        data: { breadcrumb: 'Làm bài' },
      },
      // { path: 'test/detail/:id/start', component: TestQuestionComponent, data: { breadcrumb: 'Làm bài' } },
      {
        path: 'test/detail/result',
        component: TestResultComponent,
        data: { breadcrumb: 'Kết quả' },
      },
      // { path: 'test/detail/:id/result', component: TestResultComponent, data: { breadcrumb: 'Kết quả' } },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
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
      },
      {
        path: 'test/detail',
        component: TestDetailComponent,
        data: { breadcrumb: 'Chi tiết đề thi' },
      },
      // { path: 'test/detail/:id', component: TestDetailComponent, data: { breadcrumb: 'Chi tiết đề thi' } },

      {
        path: 'test/detail/start',
        component: TestQuestionComponent,
        data: { breadcrumb: 'Làm bài' },
      },
      // { path: 'test/detail/:id/start', component: TestQuestionComponent, data: { breadcrumb: 'Làm bài' } },
      {
        path: 'test/detail/result',
        component: TestResultComponent,
        data: { breadcrumb: 'Kết quả' },
      },
      // { path: 'test/detail/:id/result', component: TestResultComponent, data: { breadcrumb: 'Kết quả' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
