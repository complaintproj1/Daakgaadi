import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUs } from '../_modals/contact-us.modal';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  
  contactUsForm: FormGroup = new FormGroup({
    customerName: new FormControl("", Validators.required),
    customerAddress: new FormControl("", Validators.required),
    customerEmail: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", Validators.required),
    customerId: new FormControl(""),
    timestamp: new FormControl(""),
    lastActionDate: new FormControl(""),
    currentStatus: new FormControl("")
  })

  constructor(
    private http: HttpClient
  ) { }

  getAllMessages(){
    return this.http.get<ContactUs[]>("https://vakeemagro.el.r.appspot.com/api/contactus/get");
  }

  postNewMessage(data){
    return this.http.post("https://vakeemagro.el.r.appspot.com/api/contactus/add", data);
  }

  updateMessageContent(data, id){
    return this.http.post(`https://vakeemagro.el.r.appspot.com/api/contactus/update?id=${id}`, data);
  }

  removeMessageRecord(data){
    return this.http.post("https://vakeemagro.el.r.appspot.com/api/contactus/remove", data);
  }
}
