import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/home/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './components/home/forget-password/forget-password.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'sign-in',
    component: SignInComponent
},
{
    path: 'forget-password',
    component: ForgetPasswordComponent
},
{
    path: 'admin',
    component: AdminDashboardComponent
},
{
    path: 'user',
    component: UserComponent,
    children:[
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }},
        { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' }},

    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
