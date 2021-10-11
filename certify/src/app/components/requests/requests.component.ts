import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private authservice:AllservicesService,private router:Router,private toastr:ToastrService) { }

  data:any
  requests:any
  ngOnInit(): void {
    this.authservice.profile().subscribe(data=>{
      this.data=data
      this.data=data.requests
      console.log(this.data)
      if(!this.data.length){
        this.toastr.success('you dont have any requests')
        this.router.navigate([''])
        return
        }
      this.authservice.getRequests(this.data).subscribe(data=>{
        console.log(data)
        this.requests=data
      })
    })
  }

  sendmail(mail:any){
    console.log(mail)
    this.authservice.sendmail(mail).subscribe()
}

}
