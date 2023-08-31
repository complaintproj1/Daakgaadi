import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "src/app/loader/loader.service";
import { ProductService } from "src/app/_services/product.service";
import { UserService } from "src/app/_services/user.service";
import { Order } from "src/app/_modals/order.modal";
import { User } from "src/app/_modals/user.modal";
import { AddAddressComponent } from '../../user-dashboard/my-addresses/add-address/add-address.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Cart } from 'src/app/_modals/cart.modal';
import { PointsService } from 'src/app/_services/points.service';

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  cart = [];
  photo: string;
  currUser;
  products = [];
  currUserId;
  grandTotal = 0;
  totalSavings = 0;
  edit: boolean = false;
  currPaymentMethod: string;
  deliveryCharges = 0;
  allAddress;
  phone;

  referralUser;
  points;
  pointsValue;
  sliderVal: boolean = false;
  pointsTotal = 0;
  showApplyPointsBool: boolean = false;

  todayDate: Date;
  tomorrowDate: Date;
  secondDayDate: Date;
  thirdDayDate: Date;

  orderExpectedDate: Date;
  deliveryList = [];

  selectedAddress;
  paymentmethod= 'cod';
  validCoupan: number = 0;
  validReferral: number = 0;
  promo: boolean = false;
  referral: boolean = false;
  showAddBtn: boolean = false;

  rzp1;
  name;
  pid;
  amount;

  countQty = 1;

  data;
  selectedFile;

  newTotal = 0;
  newTotalFlag: boolean = false;

  singleProduct;

  updatePhoneForm: FormGroup = new FormGroup({
    phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
  });

  selectaddressform: FormGroup = new FormGroup({
    address: new FormControl("", Validators.required),
  });

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event: any) => {
      this.photo = event.target.result;
    };
  }

  paymentMethods = [
    {
      name: "Cash on Delivery",
      label: "cashondelivery1",
      method: "cod",
    },
    {
      name: "Razorpay",
      label: "card1",
      method: "card",
    },
  ];

  options = {
    "key": "rzp_test_McvcqnT7fs5mfW", 
    "amount": "5000", 
    "currency": "INR",
    "name": "Viaan Mart",
    "description": "Test Transaction",
    "image": "/src/assets/images/logo.jpeg",
    "order_id": "", 
    "handler": function (response){ 
      var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public loaderService: LoaderService,
    public authService: AuthenticationService,
    public userService: UserService,
    private dialog: MatDialog,
    private pointsService: PointsService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getBuyNowProduct();
    // this.getProducts();
    this.getCurrentAddresses();
    this.getCurrentDate();
    this.getDeliveryList();
    const currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    this.phone = currUser.phone;
    this.getPoints();
  }

  getPoints(){
    this.pointsService.getPointsValue().subscribe((res: any[])=>{
      this.pointsValue = res[res.length-1].pointsToPrice;
    })
  }

  getBuyNowProduct(){
    this.singleProduct = JSON.parse(localStorage.getItem('buyNowProd'));
    console.log(this.singleProduct);
    if(this.singleProduct === null){
      this.getProducts();
    }
    else{
      this.showAddBtn = true;
      this.getTotal();
    }
  }

  increaseQty(){
    if(this.countQty !== 10){
      this.countQty = this.countQty + 1;
      this.getTotal();
    }
  }

  decreaseQty(){
    if(this.countQty !== 1){
      this.countQty = this.countQty - 1;
      this.getTotal();
    }
  }

  getTotal(){
    this.cart = [];
    this.singleProduct.qty = this.countQty;
    this.singleProduct.saving = this.singleProduct.qty * (this.singleProduct.aprice - this.singleProduct.dprice);
    this.singleProduct.total = this.singleProduct.qty * this.singleProduct.dprice; 

    this.grandTotal = this.singleProduct.total;
    this.totalSavings = this.singleProduct.saving;
    this.cart.push(this.singleProduct);
  }

  getCurrentDate(){
    this.todayDate = new Date();
    this.tomorrowDate = new Date();
    this.secondDayDate = new Date();
    this.thirdDayDate = new Date();

    console.log(this.todayDate.getHours());
    
    this.tomorrowDate.setDate(this.todayDate.getDate()+1);
    this.secondDayDate.setDate(this.todayDate.getDate()+2);
    this.thirdDayDate.setDate(this.todayDate.getDate()+3);

    console.log(this.todayDate);
    console.log(this.tomorrowDate);
    console.log(this.secondDayDate);
    
  }

  getCurrentUser() {
    this.currUser = JSON.parse(localStorage.getItem("viaanMartUser"));
  }

  getDeliveryDate(date){
    if(date === 'today'){
      this.orderExpectedDate = this.todayDate;
      this.deliveryCharges = this.deliveryList[0].value;
    }
    if(date === 'tomorrow'){
      this.orderExpectedDate = this.tomorrowDate;
      this.deliveryCharges = this.deliveryList[1].value;
    }
    if(date === 'secondDay'){
      this.orderExpectedDate = this.secondDayDate;
      this.deliveryCharges = this.deliveryList[1].value;
    }
    if(date === 'thirdDay'){
      this.orderExpectedDate = this.thirdDayDate;
      this.deliveryCharges = this.deliveryList[1].value;
    }
    console.log(this.orderExpectedDate);
  }

  getDeliveryList(){
    this.userService.getDeliveryList().subscribe(res=>{
      this.deliveryList = res;
      console.log(res);
    })
  }

  saveAddress(obj) {
    console.log(obj);
    obj.address.phone = this.phone;
    this.selectedAddress = obj.address;
  }

  paymentMethod(method) {
    this.paymentmethod = method;
    console.log(method);
  }

  close(){
    this.validCoupan = 0;
    this.promo = false;
  }

  closeReferral(){
    this.validReferral = 0;
    this.referral = false
  }

  applyPromo(code){
    this.userService.getUserProfile().subscribe((res: User)=>{
      if(res.coupon === code){
        this.validCoupan = 1;
        this.newTotalFlag = true;
        this.newTotal = ((this.grandTotal + this.deliveryCharges)*85)/100;
      }
      else{
        this.validCoupan = 2;
      }
    })
  }
  
  applyReferral(code){
    console.log(code);
    this.userService.getAllUsers().subscribe((res: User[])=>{
      const otherUsers = res.filter(x => x._id !== this.currUser._id);
      console.log(otherUsers)
      otherUsers.forEach(user=>{
        if(user.coupon === code){
          console.log(user);
          this.referralUser = user;
          this.validReferral = 1;
          this.points = this.deliveryCharges + this.grandTotal;
        }
      })
      if(this.validReferral !== 1){
        this.validReferral = 2;
      }
    })
  }

  removeCoupon(){
    this.newTotalFlag = false;
    this.newTotal = 0;
    this.validCoupan = 0;
  }

  removeReferral(){
    this.validReferral = 0;
  }

  placeOrder() {
    let cartItems = [];
    let temp = new Date();
    let date = new Date(temp).toISOString();
    console.log(this.cart);
    this.cart.forEach((prod) => {
      console.log(prod);
      let product = {
        quan: prod.qty,
        image: prod.pphoto,
        price: prod.dprice,
        name: prod.pname,
        id: prod._idm,
        vid  : prod.vid
      };


      
      cartItems.push(product);
    });

    // cartItems.forEach(item=>{
    //   this.productService.getProducts().subscribe(res=>{
    //     let items = res.filter(x => x._id === item._id);
    //     let itemQuantity = items[0].quantity - item.quan;
    //     let body = { quantity: itemQuantity };
    //     console.log(body);
    //     this.productService.updateProductQuantity(items[0]._id, body).subscribe();
    //   })
    // })

    this.data = {
      odate: date,
      oaddress: this.selectedAddress,
      oproduct: "",
      cart: cartItems,
      rpayid: "cod",
      edate: this.orderExpectedDate,
      uid: this.currUser._id,
      oprice: this.grandTotal + this.deliveryCharges,
      vid: ""
    };
    if(this.newTotalFlag === true){
      this.data.oprice = this.newTotal;
    }
    else if(this.showApplyPointsBool === true){
      this.data.oprice = this.pointsTotal;
      let body = { balance: 0 }
      this.userService.updatePointsBalance(this.currUser._id, body).subscribe();
    }
    this.options.amount = String(this.data.oprice*100);
    this.options.prefill.name = this.currUser.name;
    this.options.prefill.contact = this.currUser.phone;
    this.options.prefill.email = this.currUser.email;

    if(this.paymentmethod === 'card'){
      this.rzp1 = new this.authService.nativeWindow.Razorpay(this.options);
      this.rzp1.open();

      this.rzp1.on('payment.failed', function (response){
        console.log(response);
      })
    }
    else if(this.paymentmethod === 'cod'){
      if(this.validReferral === 1){
        let userPoints = this.points * 0.10;
        let userBody = { balance: this.currUser.balance + this.points };
        let referralUserBody = { balance: this.referralUser.balance + userPoints };

        this.userService.updatePointsBalance(this.currUser._id, userBody).subscribe(res=>{
          this.userService.updatePointsBalance(this.referralUser._id, referralUserBody).subscribe();
        })
      }
      this.data.rpayid = this.paymentmethod;


      this.cart.forEach((prod) => {
        console.log(prod);
        let product = {
          quan: prod.qty,
          image: prod.pphoto,
          price: prod.dprice,
          name: prod.pname,
          id: prod._idm,
          vid  : prod.vid
        };
  
  
        
        cartItems.push(product);
      });
      
      this.productService.placeOrder(this.data).subscribe((res: Order) => {
        console.log(res);
        let cid = { cid: String(this.currUser._id) };
        this.userService.clearCart().subscribe((res) => {
          this.productService.refreshCartAfterPlace.next(true);
        });
        localStorage.removeItem(`cart_${this.currUser._id}`);
        if (localStorage.getItem("orders")) {
          let orders = JSON.parse(localStorage.getItem("orders"));
          orders = [...orders, res._id];
          localStorage.setItem("orders", JSON.stringify(orders));
        } else {
          let order = [];
          order.push(res._id);
          localStorage.setItem("orders", JSON.stringify(order));
        }

        let oid =res._id;

        this.productService.addImage(this.selectedFile).subscribe(
          (res) => {
          

            let product = {
              name: this.name,
              screenshot: res["longUrl"]  ,
              amount: this.amount,
              uid: this.currUser._id,
              pid: oid,
              rid  : this.pid ,
              status : false
            };
    
            this.productService.sendPayment(product).subscribe((res: Order) => {

              this.showNotification(
                "snackbar-success",
                "Request Send Successfully...!!!",
                "bottom",
                "center"
              );
            })
           
          },
          (err) => {
         
            this.showNotification(
              "snackbar-danger",
              "Error...!!!",
              "bottom",
              "center"
            );
          }
        );

      
        
        this.router.navigateByUrl("/main-page/order-placed");
        this.userService.getUserProfile().subscribe(res=>{
          localStorage.setItem('viaanMartUser', JSON.stringify(res));
        })
      })
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.getCart();
    });
  }

  updatePhone(phone) {
    phone.cid = this.currUser._id;
    console.log(phone);
    this.phone = phone.phone
    this.userService.updatePhoneNumber(phone).subscribe((res) => {
      console.log(res);
      localStorage.setItem("viaanMartUser", JSON.stringify(res));
      this.getCurrentUser();
      this.updatePhoneForm.reset();
      this.edit = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '35%',
      height: '520px',
      data: 'addAddress',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'added'){
        this.userService.getUserProfile().subscribe(res=>{
          this.currUser = res;
          localStorage.setItem('viaanMartUser', JSON.stringify(this.currUser));
          this.getCurrentAddresses();
        })
      }
    });
  }

  getCurrentAddresses(){
    this.allAddress = this.currUser.address;
    console.log(this.allAddress);
    this.selectedAddress = this.allAddress[this.allAddress.length - 1];
  }

  getCart(){
    this.productService.getCart().subscribe(res=>{
      this.cart = [];
      this.grandTotal = 0;
      this.totalSavings = 0;
      res.forEach((item: Cart) =>{
        this.products.forEach(prod=>{
          if(prod._id === item.pid){
            console.log(prod);
            prod.qty = item.quantity;
            prod.saving = prod.qty * (prod.aprice - prod.dprice);
            prod.total = prod.qty * prod.dprice; 
            this.cart.push(prod);
          }
        })
      })
      console.log(this.cart);
      this.cart.forEach(prod=>{
        this.grandTotal = this.grandTotal + prod.total;
        this.totalSavings = this.totalSavings + prod.saving;
      })
    })
  }

  applyPoints(toggleValue){
    this.pointsService.getPointsValue().subscribe((res: any[])=>{
      this.pointsValue = res[res.length-1].pointsToPrice;
      console.log(this.pointsValue);
    if(this.sliderVal === true){
      console.log('inside')
      this.currUser.balance = Math.round(this.currUser.balance);
      if(this.currUser.balance < this.pointsValue){
        this.showNotification(
          'snackbar-danger',
          'Your points are too low to apply!',
          'bottom',
          'center'
        )
        this.sliderVal = false;
      }
      else{
        if(this.newTotalFlag === false){
          const rupeesFromPoints = (this.currUser.balance/this.pointsValue);
          console.log(rupeesFromPoints);
          this.pointsTotal = this.grandTotal - rupeesFromPoints;
          this.showApplyPointsBool = true;
        }
        else{
          this.showNotification(
            'snackbar-danger',
            'Reward Points cannot be applied when Referral code it applied!',
            'bottom',
            'center'
          )
        }
      }
    }
    else{
      this.showApplyPointsBool = false;
    }
    })
  }

  @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event): void {

      if(this.validReferral === 1){
        let userPoints = this.points * 0.10;
        let userBody = { balance: this.currUser.balance + this.points };
        let referralUserBody = { balance: this.referralUser.balance + userPoints };

        this.userService.updatePointsBalance(this.currUser._id, userBody).subscribe(res=>{
          this.userService.updatePointsBalance(this.referralUser._id, referralUserBody).subscribe();
        })
      }

      this.data.rpayid = event.detail.razorpay_payment_id;
      this.data
      console.log(this.data);
      this.productService.placeOrder(this.data).subscribe((res: Order) => {
        console.log(res);
        let cid = { cid: String(this.currUser._id) };
        this.userService.clearCart().subscribe((res) => {
          this.productService.refreshCartAfterPlace.next(true);
        });
        localStorage.removeItem(`cart_${this.currUser._id}`);
        if (localStorage.getItem("orders")) {
          let orders = JSON.parse(localStorage.getItem("orders"));
          orders = [...orders, res._id];
          localStorage.setItem("orders", JSON.stringify(orders));
        } else {
          let order = [];
          order.push(res._id);
          localStorage.setItem("orders", JSON.stringify(order));
        }
        this.router.navigateByUrl("/main-page/order-placed");
        this.userService.getUserProfile().subscribe(res=>{
          localStorage.setItem('viaanMartUser', JSON.stringify(res));
        })
      })
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
