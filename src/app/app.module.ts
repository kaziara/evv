import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PagesLayoutComponent} from './components/pages/pages-layout/pages-layout.component';
import {AuthLayoutComponent} from './components/authentication/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {CoreModule} from './components/core/core.module';
import {AppConfig} from './modals/app-config';
import {ApiRequestService} from './services/auth/api-request.service';
import {LoginService} from './services/auth/login.service';
import {UserInfoService} from './services/auth/user-info.service';
import {AuthenticationGuard} from './guards/authentication.guard';
import {DashboardService} from './services/dashboard/dashboard.service';
import {TransactionsService} from './services/account/transactions.service';
import {BrowserModule} from "@angular/platform-browser";
import {PagesModule} from "./components/pages/pages.module";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    PagesModule

  ],
  declarations: [
    AppComponent,
    PagesLayoutComponent,
    AuthLayoutComponent,
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    AppConfig,
    ApiRequestService,
    LoginService,
    UserInfoService,
    AuthenticationGuard,
    DashboardService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

