import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_modals/order.modal';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  currUser;
  allOrders;
  cashbacks

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllOrders();
    this.getCashback();
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getAllOrders(){
    this.userService.getUserAllOrders().subscribe((res: Order[]) =>{
      this.allOrders = res.filter((x) => {
        return x.uid === this.currUser._id;
      })
      console.log(this.allOrders);
    })
  }

  getCashback(){
    this.cashbacks = JSON.parse(localStorage.getItem(`cashback_${this.currUser._id}`));
  }

}
