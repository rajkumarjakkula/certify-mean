import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';
import { SocialAuthService,GoogleLoginProvider,SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email=""
  password="" 
  data:any;
  user: SocialUser = new SocialUser;
  constructor(private toastr: ToastrService,private router:Router,private userservice:AllservicesService, private socialAuthService: SocialAuthService) { }

  submit()
  {
    if(!this.email || !this.password){
      this.toastr.error("please Enter all the fields");
      return;
    }
    if(!/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i.test(this.email)){
      this.toastr.error("Enter Valid Email");
      return;
    }
    const newTask={
      email:this.email,
      password:this.password
    }
    this.userservice.signIn(newTask).subscribe(data=>{
      this.data=data;
      //console.log(data)
      if(data.message){
        this.toastr.error(data.message);
        this.router.navigate(['/signin'])
      }
      if(data.token){
      this.userservice.storeToken(data.token,data.user);
      this.toastr.success("Successfully SignIn");
      this.router.navigate([''])
      
      }
    },err=>{
      console.log(err)
      this.toastr.error(err.error.error);
      return
    });

    this.password=''
    this.email=''
   }
  ngOnInit(): void {
    
  }


  signInWithGoogle(): void {
    console.log(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID));
    this.socialAuthService.authState.subscribe((user) => {
      if(user===null){
        console.log("log out called")
        this.router.navigate(['login'])
      }
      else{
        this.user = user;
        console.log(user)
        this.userservice.socialLogin({username:user.name,email:user.email,password:user.id}).subscribe((data)=>{
          if(data){
            this.userservice.storeToken(data.token,data.user);
            this.toastr.success("welcome",data.user.name);
            this.router.navigate([''])
          }else{
            this.router.navigate(['signin'])
          }
        })
      }
    });
  }
}
