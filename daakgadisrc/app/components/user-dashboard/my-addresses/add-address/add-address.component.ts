import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.css"],
})
export class AddAddressComponent implements OnInit {
  types = ["Home", "Office", "Other"];
  states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  currUser;

  addAddressForm: FormGroup = new FormGroup({
    nickname: new FormControl("", Validators.required),
    addressline: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    country: new FormControl("India", Validators.required),
    pincode: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  addAddress(data) {
    console.log(data);
    this.userService.addAddress(data, this.currUser._id).subscribe(res=>{
      this.dialogRef.close("added");
    })
  }
}
