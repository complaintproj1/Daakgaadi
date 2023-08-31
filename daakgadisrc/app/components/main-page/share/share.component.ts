import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})

export class ShareComponent implements OnInit {
  currUser;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ShareComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private snackbar: MatSnackBar,
    private router: Router
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
    this.getCurrUser();
  }

  getCurrUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    console.log(this.currUser)
  }

  showCopyToClipboard(){
    this.showNotification(
      'snackbar-success',
      `Copied To Clipboard!`,
      'bottom',
      'center'
    )
  }

  showMsg(url){
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }

  openFB(){
    if(localStorage.getItem('viaanMartUser')){
      setTimeout(this.showMsg, 5000, this.data.url);
      this.showNotificationMore(
        'snackbar-secondary',
        `Please copy your Coupon for Reward Points - ${this.currUser.coupon} `,
        'bottom',
        'center'
      )
    }
    else if(localStorage.getItem('guest')){
      if(confirm('You need to Sign-up/Login First')){
        this.router.navigateByUrl('sign-in')
        this._bottomSheetRef.dismiss();
      }
    }
  }

  openWhatsapp(){
    window.open(`whatsapp://send?text=Hello, Checkout this product ${this.data.url} and use this promocode at the time of checkout for reward points - ${this.currUser.coupon}`);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  showNotificationMore(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}