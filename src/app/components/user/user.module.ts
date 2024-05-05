import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { TestCardComponent } from './test-card/test-card.component';
import { TestListComponent } from './test-list/test-list.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    ReportComponent,
    TestCardComponent,
    TestListComponent,
    UserComponent,
    TestDetailComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    RouterModule,
    RouterOutlet, 
    ReactiveFormsModule, 
    FormsModule,
  ],
  })
export class UserModule {}
