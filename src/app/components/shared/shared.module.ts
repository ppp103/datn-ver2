import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAvatarComponent } from './update-profile/update-avatar/update-avatar.component';
import { UpdateEmailComponent } from './update-profile/update-email/update-email.component';
import { UpdatePasswordComponent } from './update-profile/update-password/update-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultCircleComponent } from './result-circle/result-circle.component';
import {
  RoundProgressComponent,
  RoundProgressModule,
} from 'angular-svg-round-progressbar';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    ResultCircleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RoundProgressModule,
    MatTooltipModule,
  ],
  exports: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    ResultCircleComponent,
    MatTooltipModule,
  ],
})
export class SharedModule {}
