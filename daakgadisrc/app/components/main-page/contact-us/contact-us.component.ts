import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/_services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  currUser;

  constructor(
    public contactUsService: ContactUsService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCurrUser();
    localStorage.removeItem('buyNowProd');
  }

  getCurrUser(){
    if(localStorage.getItem('viaanMartUser')){
      this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    }
  }

  onSubmit(data){
    if(this.currUser){
      const todayDate = new Date();
      data.timestamp = todayDate;
      data.lastActionDate = 'No Action Taken';
      data.customerId = this.currUser._id;
      data.currentStatus = "To Be Evaluated";
      console.log(data);
      this.contactUsService.postNewMessage(data).subscribe(res=>{
        this.contactUsService.contactUsForm.reset();
        this.showNotification(
          'snackbar-success',
          'Request Sent Successfully!',
          'bottom',
          'center'
        )
      })
    }
    else if(localStorage.getItem('guest')){
      if(confirm('You need to Sign-up/Login First')){
        this.router.navigateByUrl('sign-in')
      }
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
