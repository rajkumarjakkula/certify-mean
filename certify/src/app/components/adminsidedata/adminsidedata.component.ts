import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-adminsidedata',
  templateUrl: './adminsidedata.component.html',
  styleUrls: ['./adminsidedata.component.css']
})
export class AdminsidedataComponent implements OnInit {

  constructor(private modalService:NgbModal,private service:AllservicesService,private router:Router,private toastr:ToastrService) { }

  data:any;
  usersdata:any;
  message:any;
  id:any="raj"
  ngOnInit(): void {
    this.details()
  }

  details(){
    this.service.allcertificates().subscribe(data=>{
    this.data=data
    })
    this.service.getAllusers().subscribe(data=>{
      this.usersdata=data
      console.log(data)
    })
  }


  closeResult:any;
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  send(id:any){
      this.id=id
      console.log(id)
      this.router.navigate(['userprofile',id])
  }
  delete(userid:any){
      this.service.deleteuser(userid).subscribe(data=>{
        this.message=data
        console.log(this.message)
        if(this.message){
        this.toastr.error(this.message.message)
        this.details()
      }
      })
  }

}
