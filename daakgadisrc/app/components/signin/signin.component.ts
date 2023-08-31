import { User } from './../../_modals/user.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/loader/loader.service';
import "firebase/auth";
import "firebase/firestore";
import { Auth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authError: Boolean = false;
  verifyPhoneBool: boolean = false;

  verifyBool: boolean = false;

  otp;
  verify;

  phoneNumber: string;
  reCaptchaVerifier;

  showOTPBool: boolean = false;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };

  constructor(
    public authService: AuthenticationService, 
    private router: Router, 
    private snackbar: MatSnackBar,
    public loaderService: LoaderService,
    private route: ActivatedRoute,
    private auth: Auth

    ) {}

  ngOnInit(): void {}

  signIn(data){
    this.authService.signIn(data).subscribe((res: User)=>{
      console.log(res);
      if(localStorage.getItem('guest')){
        localStorage.removeItem('guest');
      }
      localStorage.setItem("viaanMartUser", JSON.stringify(res));
      this.authService.signInForm.reset();
      this.showNotification(
        'snackbar-success',
        `Welcome ${res.name}...!!!`,
        'bottom',
        'center'
      )
      this.router.navigateByUrl('/main-page/subscription');
    }, (err)=>{
      this.authError = true;
      this.authService.signInForm.reset();
    });
  }

  nosignIn(){
    const data = {
      'phone'  : this.phoneNumber
    }
    this.authService.signNIn(data).subscribe((res: User)=>{
      console.log(res);
      if(localStorage.getItem('guest')){
        localStorage.removeItem('guest');
      }
      localStorage.setItem("viaanMartUser", JSON.stringify(res));
      this.authService.signInForm.reset();
      this.showNotification(
        'snackbar-success',
        `Welcome ${res.name}...!!!`,
        'bottom',
        'center'
      )
      this.router.navigateByUrl('/main-page/subscription');
    }, (err)=>{
      this.authError = true;
      this.authService.signInForm.reset();
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getVerificationID(){
    this.verify = JSON.parse(localStorage.getItem('verificationId')) || {};
  }

  checkVerifyBool(){
    if(this.phoneNumber.length === 10){
      this.verifyBool = true;
    }
    else{
      this.verifyBool = false;
    }
  }



  getOTP(){
    const code = "+91";
    const phone = code + this.phoneNumber;
    this.reCaptchaVerifier = new RecaptchaVerifier('verify-otp', { size: 'invisible' }, this.auth);
    // this.showOTPBool = true;

    signInWithPhoneNumber(this.auth, phone, this.reCaptchaVerifier).
      then((confirmationResult)=>{
        this.showOTPBool = true;
        localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId));
        this.getVerificationID();
        this.showNotification(
          'snackbar',
          'One-Time Password sent Successfully!',
          'bottom',
          'center'
        )
        this.verifyPhoneBool = true;
      }).catch((err)=>{
        alert(err.message);
        setTimeout(()=>{
          window.location.reload();
        }, 5000)
      })
  }

  onOtpChange(event){
    this.otp = event;
    console.log(this.otp);
  }

  verifyOTP(){
    var creds = (PhoneAuthProvider.credential(this.verify, this.otp));

    signInWithCredential(this.auth, creds).then((res)=>{
      console.log(res);
      this.verifyBool = false;
      this.showOTPBool = false;
      localStorage.removeItem('verificationId');
      if(localStorage.getItem('guest')){
        localStorage.removeItem('guest');
      }
      var v :any;
       v =   {
        "name" :"user",
        "phone"  :this.phoneNumber,
        


      }

      localStorage.setItem("viaanMartUser", JSON.stringify(v));
      this.authService.signInForm.reset();
      this.showNotification(
        'snackbar-success',
        `Welcome ${v.name}...!!!`,
        'bottom',
        'center'
      )
      this.router.navigateByUrl('/main-page/subscription');

      this.showNotification(
        'snackbar-success',
        'Phone Number Verified!',
        'bottom',
        'center'
      )

    }).catch((err)=>{
      this.showNotification(
        'snackbar-danger',
        'Entered OTP is Incorrect!',
        'bottom',
        'center'
      )
    })
  }
}
