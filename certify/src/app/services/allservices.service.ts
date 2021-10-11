import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AllservicesService {
 
  private apisign="http://localhost:5000"

  JwtAuthToken: any;
  user1: any;
  constructor(private http:HttpClient,private router:Router) { }
  name="service"
  user:any;

  //authentication servicess

  adminSignin(user:any):Observable<any>{
    return this.http.post<any>(this.apisign+"/adminsignin",user,httpOptions);

  }
  signUp(user:any):Observable<any>{
    console.log("siging up Observable...")
    return this.http.post<any>(this.apisign+"/signup",user,httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(errorResonse:HttpErrorResponse){
    const error=errorResonse.error;
    return error;
  }


  signIn(user:any):Observable<any>{
    return this.http.post<any>(this.apisign+"/signin",user,httpOptions);
  }

  socialLogin(user:Object):Observable<any>{
    const headers = new HttpHeaders()
    headers.set('Content-Type','application/json')
    console.log(user)
    return this.http.post(this.apisign+'/socialLogin',user,{headers:headers});
  }

 /////////////////////////////////////////////////////////////////////////////////////////////////////////

// user side services

  //profile page of user
  profile():Observable<any>{
    this.loadToken()
    console.log(this.loadToken())
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    if(this.JwtAuthToken==="")
    {
        this.router.navigate(['/signin'])
    }
    return this.http.get<any>(this.apisign+"/profile",{headers:header})
  }


  //handle requests
  getRequests(id:any):Observable<any>{
    this.loadToken()
    console.log(this.loadToken())
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    if(this.JwtAuthToken==="")
    {
        this.router.navigate(['/signin'])
    }
    const url=this.apisign+'/userrequests/'+id;
    return this.http.get<any>(url,{headers:header})
  }

  //get all certificates
  allcertificates():Observable<any>{
    this.loadToken()
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    if(this.JwtAuthToken==="")
    {
        this.router.navigate(['/signin'])
    }
    return this.http.get<any>(this.apisign+'/allcertificates',{headers:header})
  }

  //get all certificates of single user
  mycertificates():Observable<any>{
    this.loadToken()
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    if(this.JwtAuthToken==="")
    {
        this.router.navigate(['/signin'])
    }
    return this.http.get<any>(this.apisign+"/mycertificates",{headers:header})
  }

  //upload certificate by user
  certificateUpload(data:any):Observable<any>{
    this.loadToken()
    console.log(this.loadToken())
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    if(this.JwtAuthToken==="")
    {
        this.router.navigate(['/signin'])
    }
    return this.http.post<any>(this.apisign+'/addcertificate',data,{headers:header})
  }

  //deleting certificate by user
  deleteCertificate(id:any):Observable<any>{
    this.loadToken()
    console.log("deleting user Observable...")
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
  
    const url=this.apisign+'/deletecertificate/'+id;
  
    return this.http.delete<any>(url,{headers:header});
  }



//////////////////////////////////////////////////////////////////////////////////////////////


   //adminside services

  //all userslist
   getAllusers():Observable<any>{
    this.loadadminToken()
    console.log(this.loadToken())
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    console.log("get all users...")
    return this.http.get<any>(this.apisign+'/allusers',{headers:header});
}

getUser(id:any):Observable<any>{
  this.loadadminToken()
  console.log(this.loadToken())
  const header=new HttpHeaders()
  .set('Content-Type','application/json')
  .set("Authorization","Bearer "+this.JwtAuthToken)
  console.log(header)
  const url=this.apisign+'/userprofile/'+id;
  return this.http.get<any>(url,{headers:header})
}
deleteuser(userid:any):Observable<any>{
  this.loadadminToken()
    console.log(this.loadToken())
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)

    const url=this.apisign+'/deleteuser/'+userid;
    return this.http.delete<any>(url,{headers:header})

}
adminprofile():Observable<any>{
  this.loadadminToken()
  const header=new HttpHeaders()
  .set('Content-Type','application/json')
  .set("Authorization","Bearer "+this.JwtAuthToken)
  if(this.JwtAuthToken==="")
  {
      this.router.navigate(['/signin'])
  }
  return this.http.get<any>(this.apisign+"/adminprofile",{headers:header})
}
getAdminRequests(id:any):Observable<any>{
  this.loadadminToken()
  console.log(this.loadToken())
  const header=new HttpHeaders()
  .set('Content-Type','application/json')
  .set("Authorization","Bearer "+this.JwtAuthToken)
  if(this.JwtAuthToken==="")
  {
      this.router.navigate(['/signin'])
  }
  const url=this.apisign+'/seeadminrequests/'+id;
    return this.http.get<any>(url,{headers:header})
}

sendRequest(adminid:any):Observable<any>{
    this.loadadminToken()
   // console.log(this.JwtAuthToken)
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization",this.JwtAuthToken)
    console.log(header)
    const url=this.apisign+'/requests/'+adminid;
    return this.http.put<any>(url,null,{headers:header});
}
 

  


// updateUser(user:any,id:any):Observable<any>{
//   console.log("updating user...")
//   this.loadToken()
//     console.log(this.loadToken())
//     const header=new HttpHeaders()
//     .set('Content-Type','application/json')
//     .set("Authorization","Bearer "+this.JwtAuthToken)
//   const url=`${this.apiupdate}/${id}`;
//   return this.http.put<any>(url,user,{headers:header});

// }

  //delete by admin
  deleteAdminsideCertificate(id:any):Observable<any>{
    this.loadadminToken()
    console.log("deleting user Observable...")
    const header=new HttpHeaders()
    .set('Content-Type','application/json')
    .set("Authorization","Bearer "+this.JwtAuthToken)
    const url=this.apisign+'/deleteadminsidecertificate/'+id;
    return this.http.delete<any>(url,{headers:header});
  }
  
  //token storing in localstorage
  storeToken(Token: any,user: any):any{
    localStorage.setItem('token',Token)
    localStorage.setItem('user',JSON.stringify(user))
    this.JwtAuthToken = Token;
    this.user = user;
  }


  storeAdminToken(Token: any,user: any):any{
    localStorage.setItem('token',Token)
    localStorage.setItem('admin',JSON.stringify(user))
    this.JwtAuthToken = Token;
    this.user = user;
  }

  logout(){
    localStorage.clear();
    
  }

  loadToken(){
    const token = localStorage.getItem('token')
    const user1=localStorage.getItem('user')
    this.user1=user1
    this.JwtAuthToken = token
  }

  loadadminToken(){
    const token = localStorage.getItem('token')
    const user1=localStorage.getItem('admin')
    this.user1=user1
    this.JwtAuthToken = token
  }
  isTokenExpired(){

    const token = localStorage.getItem('token')
    const user1=localStorage.getItem('user')
    if(user1)
    {
    const user2=JSON.parse(user1)
        if(!token && !user2.name)
        {
          return false
        }
        else
        {
          return true
        }
    }
    else{
      return false
    }
  }

  admintokenExpired(){

    const token = localStorage.getItem('token')
    let user1=localStorage.getItem('admin')
    //console.log(user1)
    if(user1)
    {
      const user2=JSON.parse(user1)
        if(!token && !user2.adminname)
        {
          return false
        }
        else
        {
          return true
        }
    }
    else{
      return false
    }
  }


  sendmail(mail:any):Observable<any>{
    return this.http.post<any>(this.apisign+"/sendmail",mail);
  }
}