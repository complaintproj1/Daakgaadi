import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-parcelinvoice',
  templateUrl: './parcelinvoice.component.html',
  styleUrls: ['./parcelinvoice.component.css']
})
export class ParcelinvoiceComponent implements OnInit {

  users = [];
  currUser;

  constructor(
    public dialogRef: MatDialogRef<ParcelinvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService
  ) { 
    console.log(data);
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any[]) =>{
      this.users = res.filter(x => x._id === this.data.uid);
      this.currUser = this.users[this.users.length - 1];
      this.data.userName = this.currUser.name; 
      this.data.edate = new Date(this.data.edate);
      this.data.odate = new Date(this.data.odate);
      if(this.data.edate.getDate() === this.data.odate.getDate()){
        this.data.delivery = 50;
        this.data.oprice = Number(this.data.oprice) - this.data.delivery;
      }
      else{
        this.data.delivery = 0;
        this.data.oprice = Number(this.data.oprice);
      }

      console.log(this.data);
    })
  }

}
