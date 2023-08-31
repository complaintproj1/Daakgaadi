import { Component, OnInit, HostListener, } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from "src/app/_services/authentication.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscriptiondialog',
  templateUrl: './subscriptiondialog.component.html',
  styleUrls: ['./subscriptiondialog.component.css']
})
export class SubscriptiondialogComponent implements OnInit {
  cpin :any;
  price :any;
  rzp1;

  pdata : any;

  constructor( private http: HttpClient,
    public authService: AuthenticationService, 
    private router: Router, 
    ) {

     
    this.authService.getPrice().subscribe(
      data=>{
        console.warn(data);
        this.cpin= data;
      }
    )
   }

  ngOnInit(): void {
  }

  updateStatus() {
    let id= localStorage.getItem("viaanMartUser");

    if(id!=null){


      this.rzp1 = new this.authService.nativeWindow.Razorpay( {
        "key": "rzp_test_McvcqnT7fs5mfW", 
        "amount": this.price.pointsToPrice*100, 
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
        }}
        );
        this.rzp1.open();
  
        this.rzp1.on('payment.failed', function (response){
          console.log(response);
        })
    }else{
      alert("Login First");
      
    }

   
 
    
   
  }

  rSubmit(data :any){
    
    this.price = this.cpin[data];
    
    console.log(this.price);

  }

  @HostListener('window:payment.success', ['$event']) 
  onPaymentSuccess(event): void {
    let date_ob = new Date();
    date_ob.setDate( date_ob.getDate() + this.price.days );


    const body = {

 
      "expdate" : date_ob,
      "active" : "true"
      }


      const currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
      let id = currUser._id;   
      console.log(id["_id"] );
this.http.post('https://biomasspalwal.herokuapp.com/api/users/update?id=' +id   ,body ).subscribe((result)=> {
  console.log(result);
  alert("Data Saved");
},
(err) => {
  console.log(err);
  alert("Wrong email or password");
});
   

  }
}
