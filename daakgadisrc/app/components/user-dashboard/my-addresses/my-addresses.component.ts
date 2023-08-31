import { AddAddressComponent } from './add-address/add-address.component';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.css']
})
export class MyAddressesComponent implements OnInit {
  allAddress = [];
  currUser;
  

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentAddresses();
    localStorage.removeItem('buyNowProd');
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
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    this.allAddress = this.currUser.address;
    console.log(this.allAddress);
  }

}
