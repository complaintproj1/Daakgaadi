import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_modals/order.modal';
import { UserService } from 'src/app/_services/user.service';
import { ParcelinvoiceComponent } from './parcelinvoice/parcelinvoice.component';

@Component({
  selector: 'app-my-parcel',
  templateUrl: './my-parcel.component.html',
  styleUrls: ['./my-parcel.component.css']
})
export class MyParcelComponent implements OnInit {

  
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
    this.userService.getUserParcel().subscribe((res: any) =>{
      
      for(let i = res.length-1; i >= 0; i--){
        this.allOrders.push(res[i]);
      }
    })
  }

  generateInvoice(data){
    const dialogRef = this.dialog.open(ParcelinvoiceComponent, {
      height: '80%',
      width: '650px',
      data: data
    })
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
    })
  }

}
