import { Component, ElementRef,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BookComponent } from '../track/book/book.component';
import { ConfirmformComponent } from '../confirmform/confirmform.component';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-partload',
  templateUrl: './partload.component.html',
  styleUrls: ['./partload.component.css']
})
export class PartloadComponent  {

  generatedId:String='';
  actual :any;
  
  generatedEstimatedId:String='';

  generatedLength:String='';
  generatedBreadth:String='';
  generatedHeight:String='';
  generatedMultiplier:String='';
  routetype:String='';

  boxno =[];

  generatedActual:String='';
  totalestimate : any;
  
  routeid :any;

   constructor(private elementRef: ElementRef,
    public dialog: MatDialog,
    private transporterService: UserService,

    private http: HttpClient) {

      this.transporterService.getroute().subscribe((res :any)=>{
        this.routes =res;
      
        for(let i =0 ;i<res.length;i++){
          this.from.push(res[i].from);
          
        }


      })


      this.isSmallScreen = window.innerWidth <= 768;
      
      this.boxno.push(
        {
          length: 0,
          breadth: 0,
          height: 0,
          actualweight:0,
          boxes:0,
          estimateResult:0,
          price:0,

        }
      )
    
  }

  iscalculated:Boolean;
  isconfirm:Boolean;
  showTable: boolean = false;
  
  email: string;
  contact: string;  length: number;
  breadth: number;
  height: number;
  multiplier: number;
  estimateResult: number;
  pickupLocation: string = '';
  dropLocation: string = '';
  selectedCity: string = '';
  isContainer2Hidden: boolean = true;
  isDropdownOpen: boolean = false;
  estimateId: string = ''; 
  generatedEstimateId: string;
  showResult = false;
  boxes: number = 1;
  price: number;
  finalprice: number = 0;

  totalamount = 0;

  from = [];
  to = [];
  oda = [];
  routes :any;
  odas :any;
  totalweight = 0;

  selectedto : any;
  selectedfrom :any;
  
  routeprice =0;
  odaprice =0;

  selectedRoute  :any;

  routetime =0;

 
  getto(){
    for(let i =0 ;i<this.routes.length;i++){
      if( this.routes[i].from ==this.selectedfrom){
        this.to.push(this.routes[i].to);
      }
     
      
    }


  }



  findroute(){


    for(let i =0 ;i<this.routes.length;i++){
      if( this.routes[i].from ==this.selectedfrom && this.routes[i].to ==this.selectedto  ){
        this.routeprice = this.routes[i].amount;
        this.routetime = this.routes[i].time;

        // this.price= this.routes[i].amount;
        // console.log(this.routes[i].amount);

        this.selectedRoute = this.routes[i]._id;

       
        this.http.get("https://trekkowave.el.r.appspot.com/api/getod?id=" +  this.routes[i]._id).subscribe(
          (response: any) => {
          

            
            
          // Log the generated estimateId to check its value
  
          // Prepare the email text
         
          },
          (error) => {
            alert("Error in Generating the Estimate")
            console.error('Error calculating estimate:', error);
          }
        );


      

        
      }
     
      
    }


  }

  
  
  
  calculateEstimated(): void {

    for (let i = 0; i < this.boxno.length; i++) {
      const lengthValue = this.boxno[i].length;
      const breadthValue = this.boxno[i].breadth;
      const heightValue = this.boxno[i].height;
      const BoxesValue = this.boxno[i].boxes;
      const ActualValue = Number(this.boxno[i].actualweight);
      
    
      if (this.isValidInput(lengthValue, breadthValue, heightValue)) {
        const volume = (lengthValue * breadthValue * heightValue) / 1728;
        const weight = volume*6;
        const finalWeight = Math.max(weight,ActualValue);
        const finalprice = finalWeight*BoxesValue;

        this.boxno[i].estimateResult = finalprice;
        console.log(finalprice);

        console.log(this.boxno[i].estimateResult);
       
        this.calculatePrice(i);
        console.log('Price:', this.price);
        this.boxno[i].price = this.price;
       
        this.total();
        this.showTable = true;
      
      }
     
    }
    

    
      
     
      
      
    }
    

    addbox(){

if(this.boxno.length<20){
  this.boxno.push(
    {
      length: 0,
      breadth: 0,
      height: 0,
      actualweight:0,
      boxes:0,

    }
  )
}

    }

    removebox(){
      this.boxno.pop();
      this.total();
    }

    calculatePrice(i) {

     
      this.price = this.boxno[i].estimateResult*this.routeprice;

            
    }
   

    
  
    calculateMeasuredWeight(): number {
      // Logic to calculate the measured weight
      // Implement your own logic or use a predefined formula
      // For example, you can prompt the user to enter the measured weight or calculate it based on other factors
      return 0; // Replace with your actual calculated weight
    }

    total(){
      this.totalamount =0;
      this.totalweight= 0;
      for(let i =0; i<this.boxno.length; i++){
        this.totalamount +=   this.boxno[i].price;
        this.totalweight +=   this.boxno[i].estimateResult;
        console.log(this.totalweight);
        
      }
      if(this.totalamount< 500){
        this.totalamount =500;
      }
     
    }
  
    isValidInput(length: number, breadth: number, height: number): boolean {
      return (
        typeof length === 'number' &&
        typeof breadth === 'number' &&
        typeof height === 'number' &&
        !isNaN(length) &&
        !isNaN(breadth) &&
        !isNaN(height)
      );
      // Add your validation logic here if needed
      return true;
    }
  
    toggleContainer(containerId: string) {
      this.isContainer2Hidden = !this.isContainer2Hidden;
    }
  
    getEstimate() {
      const estimate = this.calculateEstimate(this.pickupLocation, this.dropLocation);
      alert("Estimated Price: $" + estimate);
    }
  
    calculateEstimate(pickupLocation: string, dropLocation: string): number {
      return 100; // Sample estimate value, modify as per your requirement
    }
  
    updateSelectedCity(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      this.selectedCity = checkbox.value;
      this.isContainer2Hidden = true; // Close the second container
    }
    toggleDropdown(): void {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  
    selectOption(option: string): void {
      const selectTrigger = document.querySelector('.select-trigger') as HTMLElement;
      selectTrigger.innerText = option;
      this.toggleDropdown();
    }

    sendConfirmationEmail() {

      const estimateData = {
        from : this.selectedfrom,
        to : this.selectedto,
        routeid :this.selectedRoute,
        email: this.email,
                contact: this.contact, 
                length: this.generatedLength,
                breadth: this.generatedBreadth,
                height: this.generatedHeight,
                multiplier: 6,
                estimateResult: this.totalweight,
                actualweight:this.generatedActual,
             
                isconfirm:false,
                boxes:this.boxes,
                price:this.price,
                amount : this.price,
                multibox :this.boxno,
               totalamount :  this.totalamount 
  
              };
              
     
  
      this.http.post<any>('https://trekkowave.el.r.appspot.com/api/todos', estimateData).subscribe(
        (response) => {
          this.generatedId = response._id;

          
          var confdata = {
            id : this.generatedId,
            type   : "estimupdateall"
          }
    
          // localStorage.setItem('type', type);
    
    
          const dialogRef = this.dialog.open(ConfirmformComponent, {
            height: '550px',
            width: '55%'   ,
            data : confdata })
          dialogRef.afterClosed().subscribe(res=>{
            console.log(res);
          })

        },
        (error) => {
          console.error('Error sending confirmation email:', error);
        }
      );

     

   

     
    }

    updateStatus() {
      this.http.put<any>(`https://trekkowave.el.r.appspot.com/api/reest/${this.generatedId}/isconfirm`, {}).subscribe(
        (response) => {
          console.log('Confirmation status updated successfully');
          // Handle the response or update any necessary UI elements
        },
        (error) => {
          console.error('Error updating confirmation status:', error);
          // Handle the error or show an error message to the user
        }
      );
    }
    isNavbarOpen: boolean = false;
    isSmallScreen: boolean = false;
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      // Update isSmallScreen based on window width
      this.isSmallScreen = window.innerWidth <= 768;
    }
  
  
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  
    closeNavbar() {
      this.isNavbarOpen = false;
    }

}
