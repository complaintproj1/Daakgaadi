import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_modals/order.modal';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-invoice',
  templateUrl: './my-invoice.component.html',
  styleUrls: ['./my-invoice.component.css']
})
export class MyInvoiceComponent implements OnInit {

  currUser;
  allOrders = [];
  invertedAllOrders = [];

  invoiceData;

  constructor(public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllOrders();
    localStorage.removeItem('buyNowProd');
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getAllOrders(){
    this.userService.getUserAllOrders().subscribe((res: Order[]) =>{
      this.invertedAllOrders = res.filter((x) => {
        return x.uid === this.currUser._id;
      })
      this.invertedAllOrders.forEach(order=>{
        order.odate = new Date(order.odate);
        order.edate = new Date(order.edate);
        if(order.odate.getDate() === order.edate.getDate()){
          order.delivery = 50;
          order.oprice = Number(order.oprice) - order.delivery;
        }
        else{
          order.delivery = 0;
          order.oprice = Number(order.oprice);
        }
      })
      console.log(this.invertedAllOrders);
      for(let i = this.invertedAllOrders.length-1; i >= 0; i--){
        this.allOrders.push(this.invertedAllOrders[i]);
      }
      console.log(this.allOrders);
    })
  }

  generateInvoice(data){
    // const dialogRef = this.dialog.open(InvoiceComponent, {
    //   height: '80%',
    //   width: '650px',
    //   data: data
    // })
    // dialogRef.afterClosed().subscribe(res=>{
    //   console.log(res);
    // })
  }

}
