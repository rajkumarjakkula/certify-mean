import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AllCertificatesComponent } from './components/all-certificates/all-certificates.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'adminsignin',component:AdminsigninComponent},
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'allcertificates',component:AllCertificatesComponent},
  {path:'*',redirectTo:""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[SigninComponent,SignupComponent,HomeComponent,ProfileComponent,AdminsigninComponent];