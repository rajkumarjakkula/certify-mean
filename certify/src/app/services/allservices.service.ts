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


//   getAllusers():Observable<any>{
//     this.loadToken()
//     console.log(this.loadToken())
//     const header=new HttpHeaders()
//     .set('Content-Type','application/json')
//     .set("Authorization","Bearer "+this.JwtAuthToken)
//     console.log("get all users...")
//     return this.http.get<any>(this.apiallusers,{headers:header});
// }


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

  adminSignin(user:any):Observable<any>{
    return this.http.post<any>(this.apisign+"/adminsignin",user,httpOptions);

  }
  signUp(user:any):Observable<any>{
    console.log("siging up Observable...")
    return this.http.post<any>(this.apisign+"/signup",user,httpOptions).pipe(catchError(this.handleError));
  }
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
  signIn(user:any):Observable<any>{
    return this.http.post<any>(this.apisign+"/signin",user,httpOptions);
  }
  // adminSignin(user:any):Observable<any>{
  //   return this.http.post<any>(this.apisign+"/adminsignin",user,httpOptions);
  // }

  socialLogin(user:Object):Observable<any>{
    const headers = new HttpHeaders()
    headers.set('Content-Type','application/json')
    console.log(user)
    return this.http.post(this.apisign+'/socialLogin',user,{headers:headers});
  }
private handleError(errorResonse:HttpErrorResponse){
  const error=errorResonse.error;
  return error;
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

deleteCertificate(id:any):Observable<any>{
  this.loadToken()
  console.log("deleting user Observable...")
  const header=new HttpHeaders()
  .set('Content-Type','application/json')
  .set("Authorization","Bearer "+this.JwtAuthToken)

  const url=this.apisign+'/deletecertificate/'+id;

  return this.http.delete<any>(url,{headers:header});
}
deleteAdminsideCertificate(id:any):Observable<any>{
  this.loadToken()
  console.log("deleting user Observable...")
  const header=new HttpHeaders()
  .set('Content-Type','application/json')
  .set("Authorization","Bearer "+this.JwtAuthToken)

  const url=this.apisign+'/deleteadminsidecertificate/'+id;

  return this.http.delete<any>(url,{headers:header});
}
  
storeToken(Token: any,user: any):any{
  localStorage.setItem('token',Token)
  localStorage.setItem('user',JSON.stringify(user))
  this.JwtAuthToken = Token;
  this.user = user;
}

// isloggedIn(){
//   const user1=localStorage.getItem('user')
//   if(user1)
//   {
//     return "user"
//   }
//   return 'not user'
// }

logout(){
  localStorage.clear();
}

loadToken(){
  const token = localStorage.getItem('token')
  const user1=localStorage.getItem('user')
  this.user1=user1
  this.JwtAuthToken = token
}
isTokenExpired(){

  const token = localStorage.getItem('token')
  const user1=localStorage.getItem('user')
  if(!token && !user1)
  {
    return false
  }
  else{
    return true
  }
}
}