import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {
  cashbacks;
  currUser;
  totalCashback = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.getCurrUser();
    this.getCashbacks();
    localStorage.removeItem('buyNowProd');
  }

  getCurrUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getCashbacks(){
    this.cashbacks = JSON.parse(localStorage.getItem(`cashback_${this.currUser._id}`));
    this.cashbacks.forEach(element => {
      this.totalCashback = this.totalCashback + element;
    });
  }

}
