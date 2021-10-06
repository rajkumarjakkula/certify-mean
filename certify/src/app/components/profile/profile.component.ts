import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllservicesService } from 'src/app/services/allservices.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService:NgbModal,private authservice:AllservicesService,private http:HttpClient,private toastr:ToastrService) { }

  selectedFile="";

  title:string="";
  body:string="";
  imageurl:any;
  rating:string="";
  expiry:string="";
  message:any;
  certificates:any=[];
  onFileSelected(event:any){
    //console.log(event)
    this.selectedFile=event.target.files[0];
  }
  ngOnInit(): void {
    this.authservice.profile().subscribe(data=>{
      this.data=data
      this.email=this.data.email
      this.name=this.data.name
    })

    this.authservice.mycertificates().subscribe(data=>{
      this.certificates=data
    })
  }

  onUpload():any{
    const data = new FormData()
    data.append("file",this.selectedFile)
    data.append("upload_preset","library_x")
    data.append("cloud_name","dnpuhqlav")
    this.http.post("https://api.cloudinary.com/v1_1/dnpuhqlav/image/upload",data)
    .subscribe(res=>{
      this.imageurl= res
     // console.log(this.imageurl)
      this.imageurl= this.imageurl.url
    })
  }
  

  onsubmit(){

    const post={
      title:this.title,
      body:this.body,
      rating:this.rating,
      expiry:this.expiry,
      pic:this.imageurl
    }
    //console.log(post)
    this.authservice.certificateUpload(post).subscribe(data=>{
      this.message=data
      if(this.message)
      {
        this.toastr.success("certificate added to your profile")
      }
    }

    )
    this.ngOnInit()
  }
  delete(id:any){
    console.log(id)
    this.authservice.deleteCertificate(id).subscribe(data=>{
      this.message=data
      console.log(this.message)
      if(this.message){
      this.toastr.error(this.message.message)
      this.ngOnInit()
    }
    })
  }
  name:string="loading..";
  email:string="loading...";
  data:any;
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
}
