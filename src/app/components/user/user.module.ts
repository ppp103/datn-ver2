import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UpdateEmailComponent } from '../shared/update-profile/update-email/update-email.component';
import { UpdateAvatarComponent } from '../shared/update-profile/update-avatar/update-avatar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { TestCardComponent } from './test-card/test-card.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestQuestionComponent } from './test-question/test-question.component';
import { TestResultComponent } from './test-result/test-result.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { FormatTimePipe } from '../../pipes/format-time.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    ReportComponent,
    TestCardComponent,
    TestListComponent,
    TestQuestionComponent,
    TestResultComponent,
    UserComponent,
    TestDetailComponent,
    FormatTimePipe,
  ],
  imports: [CommonModule, SharedModule, RouterModule, RouterOutlet],
})
export class UserModule {}
