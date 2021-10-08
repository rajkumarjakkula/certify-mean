import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-profiledata',
  templateUrl: './profiledata.component.html',
  styleUrls: ['./profiledata.component.css']
})
export class ProfiledataComponent implements OnInit {


  constructor(private route:ActivatedRoute,private service:AllservicesService) { }
  id:any;
  data:any;
  profile:any;
  ngOnInit(): void {
    this.getuser()
  }

  

  getuser(){
     this.id =this.route.snapshot.paramMap.get('id')
     console.log(this.id)

     this.service.getUser(this.id).subscribe(data=>{
       this.data=data
       this.profile=data.user
       this.data=data.alldetails
      //  console.log(data)
     })

   ;
  }
}
