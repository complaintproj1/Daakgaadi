import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-rewards',
  templateUrl: './my-rewards.component.html',
  styleUrls: ['./my-rewards.component.css']
})
export class MyRewardsComponent implements OnInit {
  currUser;
  cashbacks = 0;

  constructor() { }

  ngOnInit(): void {
    this.getCurrUser();
    this.getCaskback();
    localStorage.removeItem('buyNowProd');
  }

  getCurrUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getCaskback(){
    let temp = JSON.parse(localStorage.getItem(`cashback_${this.currUser._id}`));
    temp?.forEach(element => {
      this.cashbacks = this.cashbacks + element;
    });
  }

}
