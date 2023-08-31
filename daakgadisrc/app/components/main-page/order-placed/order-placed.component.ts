import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
import { Order } from 'src/app/_modals/order.modal';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
  orderId;
  orderDetails;
  currUser;
  todayDate;
  expectedOdate;

  constructor(
    private userService: UserService,
    public loaderService: LoaderService,
    private notiService: NotificationService
    ) { }

  ngOnInit(): void {
    let date: Date = new Date();
    this.todayDate = date.getDate();
    console.log(this.todayDate)
    this.getRecentlyPlacedOrder();
  }

  getRecentlyPlacedOrder(){
    const currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    let phone = currUser.phone;
    let orderIds = JSON.parse(localStorage.getItem('orders'));
    this.orderId = orderIds[orderIds.length-1];
    this.userService.getUserProfile().subscribe(res=> this.currUser = res);
    console.log(this.orderId);
    this.userService.getUserOrder(this.orderId).subscribe((res: Order[])=>{
      console.log(res);
      this.orderDetails = res[res.length - 1];
      console.log(this.orderDetails);
      if(this.orderDetails.rpayid === 'cod'){
        this.notiService.sendNotification('VIAANT', phone, `Great, We receive an order ${this.orderDetails.ono} from you. Thank you for shopping with Viaanmart.`).subscribe(res=>{
          console.log(res);
        })
      }
      else{
        this.notiService.sendNotification('VIAANT', phone, `We receive an shopping order from you with order id ${this.orderDetails.ono} . Thank you for paying online in Viaanmart.`).subscribe(res=>{
          console.log(res);
        })
      }
    });
    
  }

}
