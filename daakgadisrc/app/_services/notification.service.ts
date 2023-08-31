import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(sender, number, message){
    return this.http.get(`https://api.textlocal.in/send/?apiKey=NDE2YzZlNjY0ZDU2NzE0YzUyNTQ2ZTU4NzA0MjdhNmU=&sender=${sender}&numbers=91${number}&message=${message}`)
  }
}
