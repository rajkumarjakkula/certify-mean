import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-adminrequests',
  templateUrl: './adminrequests.component.html',
  styleUrls: ['./adminrequests.component.css']
})
export class AdminrequestsComponent implements OnInit {

  constructor(private authservice:AllservicesService,private router:Router,private toastr:ToastrService) { }

  requests:any;
  data:any
  ngOnInit(): void {
    this.authservice.adminprofile().subscribe(data=>{
      this.data=data
      this.data=data.sentrequests
      console.log(this.data)
      if(!this.data.length){
        this.toastr.success('you dont have any requests')
      this.router.navigate([''])
      return
      }
      console.log(this.data)
      this.authservice.getAdminRequests(this.data).subscribe(data=>{
        console.log(data)
        this.requests=data
      })
    })
   
    
  }

}
