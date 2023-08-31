import { Observable, Subject } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";


function _window(): any{
  return window;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  base64token = btoa('rzp_test_McvcqnT7fs5mfW:tmg6xiui0jzdc1uJ5mtu38xp'); 
  currRoute: Subject<string> = new Subject();

  get nativeWindow() : any {
    return _window();
  }

  signInForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  logInAdminForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  constructor(private http: HttpClient) {}

  signIn(data): Observable<{}> {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/users/login",
      data
    );
  }

  signNIn(data): Observable<{}> {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/users/phonelogin",
      data
    );
  }

  signUp(data) {
    console.log(data);

    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/users/signup",
      data
    );
  }

  vendorLogin(data) {
    return this.http.post(
      " https://vakeemagro.el.r.appspot.com/api/vendors/login",
      data
    );
  }

  generateOrder(data){
    return this.http.get("https://api.razorpay.com/v1/orders", { headers: new HttpHeaders({ 'Content-Type' : 'application/json' , 'Access-Control-Allow-Headers': 'Content-Type', 'Authorization': `Basic ${this.base64token}`})})
  }

  getPrice(){
    let url ="https://vakeemagro.el.r.appspot.com/api/points/get" ;
    return  this.http.get(url);
  }

  getActive(id: any){
    let url ="https://vakeemagro.el.r.appspot.com/api/users/active?id=" +id;
    return  this.http.get(url);
  }

}

