import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import {NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  users = [];
  currUser;

  constructor(
    public dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService
  ) { 
    console.log(data);
  }

  ngOnInit(): void {
    // this.userService.getAllUsers().subscribe((res: any[]) =>{
    //   this.users = res.filter(x => x._id === this.data.uid);
    //   this.currUser = this.users[this.users.length - 1];
    //   this.data.userName = this.currUser.name; 
    //   this.data.edate = new Date(this.data.edate);
    //   this.data.odate = new Date(this.data.odate);
    //   if(this.data.edate.getDate() === this.data.odate.getDate()){
    //     this.data.delivery = 50;
    //     this.data.oprice = Number(this.data.oprice) - this.data.delivery;
    //   }
    //   else{
    //     this.data.delivery = 0;
    //     this.data.oprice = Number(this.data.oprice);
    //   }

    //   console.log(this.data);
    // })
  }
  printPage(){
    let printContents, popupWin;
		printContents = document.getElementById('agrrement-section').innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		if(popupWin){
			popupWin.document.open();
			popupWin.document.write(`
				<html>
					<head>
						<title>Daakgadi</title>
						<style type="text/css">
              p {
                font-family: "Times New Roman";
              }

              .padding-main-divcls{
                padding: 5px;
              }

              .text-center{
                text-align: center
              }
              .width-full{
                width: 100%;
              }

              
              .box{
                  border-style: solid;
                  border-width: 1px;
                  width: 65px;
                  height: 100px;
                  float: right;
                  margin-right: 50px;
                  font-size: 10px;
                  background-color:blue;
                  padding: 5px;
              }
              .box-divcls{
                width: 100%;
                display: inline-block;
              }

              .TermsConditionTable, tr , td {
								padding: 4px !important;
							}
							tr, td {
								page-break-inside: avoid !important;
							}
            

							.break-after{
								page-break-after: always;
							}
              .top-border-cls{
                border-top: solid black 1.0pt;
              }
            </style>
            <body onload="window.print();window.close()">
            <div style="height:50%">
            ${printContents}
            <div>
            <div style="height:50%">
            ${printContents}
            <div>

           

            <div style="height:50%">
            ${printContents}
            <div>
            <div style="height:50%">
            ${printContents}
            <div>
            
            </body>
          </head>
        </html>
      `)
      popupWin.document.close();
    }

  }
}
