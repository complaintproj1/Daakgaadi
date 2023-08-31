import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/loader/loader.service';
import "firebase/auth";
import "firebase/firestore";
import { Auth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from '@angular/fire/auth';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(
    public authService: AuthenticationService, 
    private router: Router,
    private snackbar: MatSnackBar,
    public loaderService: LoaderService,
    private auth: Auth
    ) {}

  signInFormControl = this.authService.signUpForm;
  signUpError = false;
  errorText;

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

  ngOnInit(): void {
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

  signUp(data){
    this.authService.signUp(data).subscribe((res)=>{
      this.signUpError = false;
      console.log(res);
      this.authService.signUpForm.reset();
      this.router.navigateByUrl('/');
      this.showNotification(
        'snackbar-success',
        'Sign-Up Successfully...!!!',
        'bottom',
        'center'
      )
    }, (err)=>{
      console.log(err.error.msg);
      this.errorText = err.error.msg;
      this.signUpError = true;
      this.authService.signUpForm.reset();
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
