import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-adminrequests',
  templateUrl: './adminrequests.component.html',
  styleUrls: ['./adminrequests.component.css']
})
export class AdminrequestsComponent implements OnInit {

  constructor(private authservice:AllservicesService) { }

  requests:any;
  data:any
  ngOnInit(): void {
    this.authservice.adminprofile().subscribe(data=>{
      this.data=data
      this.data=data.sentrequests
      console.log(this.data)
      this.authservice.getAdminRequests(this.data).subscribe(data=>{
        console.log(data)
        this.requests=data
      })
    })

    
  }

}
