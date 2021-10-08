import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.css']
})
export class AdminsigninComponent implements OnInit {

  email=""
  password="" 
  data:any;
  constructor(private toastr: ToastrService,private router:Router,private userservice:AllservicesService) { }

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
    this.userservice.adminSignin(newTask).subscribe(data=>{
      this.data=data;
      console.log(data)
      if(data.token){
      this.userservice.storeAdminToken(data.token,data.admin);
      this.toastr.success("Successfully SignIn");
      this.router.navigate([''])
      
      }
    },err=>{
      console.log(err.error)
      this.toastr.error(err.error.error);
      return
    });

    this.password=''
    this.email=''
   }
  ngOnInit(): void {
  }

}
