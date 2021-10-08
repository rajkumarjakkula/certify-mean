import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
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
    this.signOut()
    this.router.navigate(['/signin'])
  }

  signOut(): void {
    this.authService.signOut();
  }
  constructor(public userservice:AllservicesService,private router:Router ,private modalService:NgbModal,public authguard:AuthGuard,private authService: SocialAuthService) { 
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
  user:boolean=false;
  ngOnInit(): void {


    
  }

  
}  
