import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories = [];

  constructor(private productService: ProductService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  showCopyToClipboard(){
    this.showNotification(
      'snackbar-success',
      `Phone Number Copied!`,
      'bottom',
      'center'
    )
  }

  getCategories(){
    this.productService.getCategories().subscribe(res=>{
      console.log(res);
      this.categories = res;
    })
  }

  refresh(id){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/main-page/featured-products/${id}`]);
  }

  openSocialLinks(media){
    if(media === 'fb'){
      window.open('https://www.facebook.com/');
    }
    
    if(media === 'insta'){
      window.open('https://www.instagram.com/');
    }

    if(media === 'whats'){
      window.open('https://api.whatsapp.com/send?phone=919999167600&text=Hello! We want to do shifting services with you.Please help us out with the best.');
    }
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
