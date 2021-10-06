import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AllservicesService } from 'src/app/services/allservices.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  func(){
    this.userservice.logout();
    this.router.navigate(['/signin'])
  }

  constructor(public userservice:AllservicesService,private router:Router ,private modalService:NgbModal,public authguard:AuthGuard) { 
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) 
    {
      return 'by pressing ESC';
    } 
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) 
    {
      return 'by clicking on a backdrop';
    }
     else 
    {
      return  `with: ${reason}`;
    }
  }
  
  admin:boolean=false;
  token:any;
  closeResult:any;
  notsignin:boolean=true;
  user:boolean=false;
  ngOnInit(): void {
    // const token = localStorage.getItem('user')
    // if(token){
    // this.notsignin=false
    // const token1=JSON.parse(token)
    // if(token1.name){
    //   console.log("user login...")
    //   this.user=true
    //}
  }

  // opened: boolean = false;
 
  // toggleSidebar() {
  //   this.opened = !this.opened;
  // }
}  
