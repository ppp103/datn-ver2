import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAvatarComponent } from './update-profile/update-avatar/update-avatar.component';
import { UpdateEmailComponent } from './update-profile/update-email/update-email.component';
import { UpdatePasswordComponent } from './update-profile/update-password/update-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UpdateAvatarComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
  ]
})
export class SharedModule { }
