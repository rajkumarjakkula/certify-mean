import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminrequestsComponent } from './components/adminrequests/adminrequests.component';
import { AdminsidedataComponent } from './components/adminsidedata/adminsidedata.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AllCertificatesComponent } from './components/all-certificates/all-certificates.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfiledataComponent } from './components/profiledata/profiledata.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminsignin',component:AdminsigninComponent},
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'allcertificates',component:AllCertificatesComponent,canActivate:[AdminGuard]},
  {path:'adminpanel',component:AdminsidedataComponent,canActivate:[AdminGuard]},
  {path:'userprofile/:id',component:ProfiledataComponent},
  {path:'myrequests',component:RequestsComponent},
  {path:'adminrequests',component:AdminrequestsComponent},
  {path:'**',redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[SigninComponent,SignupComponent,HomeComponent,ProfileComponent,AdminsigninComponent];