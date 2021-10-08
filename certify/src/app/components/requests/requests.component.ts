import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private modalService:NgbModal,private authservice:AllservicesService,private http:HttpClient,private toastr:ToastrService) { }

  data:any
  requests:any
  ngOnInit(): void {
    this.authservice.profile().subscribe(data=>{
      this.data=data
      this.data=data.requests
      this.authservice.getRequests(this.data).subscribe(data=>{
        console.log(data)
        this.requests=data
      })
    })

    
   
  }

}
