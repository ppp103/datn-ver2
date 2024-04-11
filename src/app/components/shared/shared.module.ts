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
import { PaggingComponent } from './pagging/pagging.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    ResultCircleComponent,
    PaggingComponent,
    MyAlertDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RoundProgressModule,
    MatTooltipModule,
    GridModule,
    MatDialogModule,
  ],
  exports: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    ResultCircleComponent,
    MatTooltipModule,
    PaggingComponent,
  ],
})
export class SharedModule {}
