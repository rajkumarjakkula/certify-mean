import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/services/allservices.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email=""
  password="" 
  name=""
  data:any;

  constructor(private userserice:AllservicesService,private toastr:ToastrService,private router:Router) { }

  func(){
    this.router.navigate(['/signin'])
  }
  submit()
  {
    if(!this.email || !this.password){
      this.toastr.success("please Enter all the fields");
      return;
    }
    if(!/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i.test(this.email)){
      this.toastr.error("Enter Valid Email");
      return;
    }
    const newTask={
      name:this.name,
      email:this.email,
      password:this.password
    }
    this.userserice.signUp(newTask).subscribe(data=>{
      this.data=data
      if(data){
        console.log(data)
      this.toastr.success(data.message)
      this.func();
      return
      }
    },err=>{
      this.toastr.error(err.error)
    });
    this.name=''
    this.password=''
    this.email=''
  }
  ngOnInit(): void {
  }

}
