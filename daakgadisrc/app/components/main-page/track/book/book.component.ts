import { Component, ElementRef,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent  {

 
  
  generatedId:String='';
  actual :any;
  
  generatedEstimatedId:String='';

  generatedLength:String='';
  generatedBreadth:String='';
  generatedHeight:String='';
  generatedMultiplier:String='';
  generatedActual:String='';
  
   constructor(private elementRef: ElementRef,
    private http: HttpClient) {
      this.isSmallScreen = window.innerWidth <= 768;
      this.type = localStorage.getItem('type');
    
  }

  iscalculated:Boolean;
  isconfirm:Boolean;
  showTable: boolean = false;
  
  email: string;
  contact: string;  length: number;
  breadth: number;
  name:any;
  type :any;
  area:any;
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



 
  
  
   
  calculateEstimated(): void {


    // const boxes= document.getElementById('boxes')as HTMLInputElement;
    

      
      // const lengthValue = lengthInput.valueAsNumber;
      // const breadthValue = breadthInput.valueAsNumber;
      // const heightValue = heightInput.valueAsNumber;
      // const BoxesValue = boxes.valueAsNumber;
      //const multiplierValue = Number(multiplierInput.value);
      
      
    
    //  if (this.isValidInput(lengthValue, breadthValue, heightValue)) {

        // const volume = (lengthValue * breadthValue * heightValue) / 1728;
        // const weight = volume*6;
        // const finalWeight = Math.max(weight,ActualValue);
        // const finalprice= finalWeight*BoxesValue;

        // this.estimateResult = isNaN(finalprice) ? 0 : finalprice;
        // console.log(finalprice);
       
        // this.calculatePrice();
        // console.log('Price:', this.price);
  
        var type = localStorage.getItem("type");

        this.showTable = true;
        // Send the estimate data to the server to store in MongoDB
        const estimateData = {
          name : this.name,
          email: this.email,
          contact: this.contact, 
          addres : this.area,
          type : type,
        
        };
        
        console.log(estimateData);

    
        this.http.post<any>('https://trekkowave.el.r.appspot.com/api/addtruck', estimateData).subscribe(
          (response: any) => {
            

            alert("successfully Generated Estimate");
            this.generatedId=response._id;
            console.log(this.generatedId)
            this.generatedEstimatedId=response.estimateResult;
            this.generatedLength=response.length;
            this.generatedBreadth=response.breadth;
            this.generatedHeight=response.height;
            this.generatedMultiplier=response.multiplier;
            this.generatedActual=response.actualweight;
            
          // Log the generated estimateId to check its value
  
          // Prepare the email text
         
          },
          (error) => {
            alert("Error in Generating the Estimate")
            console.error('Error calculating estimate:', error);
          }
        );
    //  }
      
      
    }
    
    
    calculatePrice() {
     console.log("clicked");
      // Retrieve the user inputs
      const pickupLocation: string = (document.getElementById('pickup') as HTMLSelectElement).value;
      const dropLocation: string = (document.getElementById('drop') as HTMLSelectElement).value;
      
  console.log(this.estimateResult);
      switch (pickupLocation) {
        case 'delhi':
          switch (dropLocation) {
            case 'delhi':
              this.price = this.estimateResult*10;
              break;
              case 'agra':
                this.price =this.estimateResult*20;
              break;
              case 'haryana':
                this.price = this.estimateResult*30;
              break;
            // Add more drop location cases as needed
            default:
              this.price = 0; // Handle unknown drop locations
              break;
          }
          break;
        // Add more pickup location cases as needed
        case 'agra':

        switch (dropLocation) {
          case 'delhi':
            this.price = this.estimateResult * 20;
            break;
          case 'agra':
            this.price = this.estimateResult * 10;
            break;
          case 'haryana':
            this.price = this.estimateResult * 40;
            break;
          default:
            this.price = 0; // Handle unknown drop locations
            break;
        }
        break;
              
              case 'haryana':
                switch (dropLocation) {
                  case 'delhi':
                    this.price = this.estimateResult * 30;
                    break;
                  case 'agra':
                    this.price = this.estimateResult * 40;
                    break;
                  case 'haryana':
                    this.price = this.estimateResult * 10;
                    break;
                  default:
                    this.price = 0; // Handle unknown drop locations
                    break;
                }
                break;
              default:
                this.price = 0; // Handle unknown pickup locations
                break;
            }
            
    }
   

    
  
    calculateMeasuredWeight(): number {
      // Logic to calculate the measured weight
      // Implement your own logic or use a predefined formula
      // For example, you can prompt the user to enter the measured weight or calculate it based on other factors
      return 0; // Replace with your actual calculated weight
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
      if(!this.generatedId){
        alert('please submit from to genrte id')
      }
      if(!this.generatedEstimatedId){
        alert('please submit from to genrte estimatedid')
      }
      const emailData = {
        email: this.email,
        id:this.generatedId,
        estimateResult:this.generatedEstimatedId,
        length:this.generatedLength,
        breadth:this.generatedBreadth,
        height:this.generatedHeight,
        multiplier:this.generatedMultiplier,
        actualWeight:this.generatedActual
  
  
        // Pass the email text with estimate details
      };
  
      this.http.post<any>('https://trekkowave.el.r.appspot.com/api/estimate', emailData).subscribe(
        (response) => {
          this.updateStatus();
          alert("Email sent Successfully")
          console.log('Confirmation email sent:', response);
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
