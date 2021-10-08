import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {HttpClientModule} from '@angular/common/http'
import { ProfileComponent } from './components/profile/profile.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
 import { SidebarModule } from 'ng-sidebar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllCertificatesComponent } from './components/all-certificates/all-certificates.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SocialAuthServiceConfig,SocialLoginModule,GoogleLoginProvider} from 'angularx-social-login';
import { AdminsidedataComponent } from './components/adminsidedata/adminsidedata.component';
import { ProfiledataComponent } from './components/profiledata/profiledata.component';
import { RequestsComponent } from './components/requests/requests.component';
import { AdminrequestsComponent } from './components/adminrequests/adminrequests.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    routingComponents,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    SidenavComponent,
    AllCertificatesComponent,
    AdminsigninComponent,
    AdminsidedataComponent,
    ProfiledataComponent,
    RequestsComponent,
    AdminrequestsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    SidebarModule.forRoot()
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '370055316335-792o3d5uefpeaf3se77u5e90348v2t36.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
