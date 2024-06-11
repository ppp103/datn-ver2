import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminModule } from './components/admin/admin.module';
import { HomeModule } from './components/home/home.module';
import { UserModule } from './components/user/user.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './components/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
// import { LoadingInterceptor } from './services/loading/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { LoadingComponent } from './components/shared/loading/loading.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    AdminModule,
    HomeModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    HighchartsChartModule,
    MatProgressSpinnerModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
