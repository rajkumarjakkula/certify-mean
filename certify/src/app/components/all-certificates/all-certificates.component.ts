import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css']
})
export class AllCertificatesComponent implements OnInit {

  constructor(private service:AllservicesService,private router:Router,private toastr:ToastrService) { }

  data:any;
  searchText: any;
  message:any;
  ngOnInit(): void {
    this.service.allcertificates().subscribe(data=>{
      this.data=data
    })
  }

  delete(id:any){
    console.log(id)
    this.service.deleteAdminsideCertificate(id).subscribe(data=>{
      this.message=data
      console.log(this.message)
      if(this.message){
      this.toastr.error(this.message.message)
      this.ngOnInit()
    }
    })
  }
 
  

}
