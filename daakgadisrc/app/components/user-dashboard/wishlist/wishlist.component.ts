import { ProductService } from './../../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/_modals/wishlist.modal';
import { Products } from 'src/app/_modals/product.modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Products[] = [];

  constructor(private productService: ProductService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWishlist();
    localStorage.removeItem('buyNowProd');
  }

  getWishlist(){
    this.productService.getWishlist().subscribe((res: Wishlist[])=>{
      console.log(res);
      let items = res.map(x => x.pid);
      this.productService.getProducts().subscribe((res: Products[])=>{
        this.wishlist = res.filter((x) => 
          items.map((y) => y).includes(x._id)
        )
        console.log(this.wishlist);
      })
    })
  }

  removeFromWishlist(pid){
    this.productService.getWishlist().subscribe((res: Wishlist[])=> {
      let product = res.find(x => x.pid === pid);
      let id = { id: product._id };
      this.productService.removeFromWishlist(id).subscribe(res=>{
        this.showNotification(
          'snackbar-danger',
          `Removed From Wishlist...!!!`,
          'bottom',
          'center'
        )
        this.getWishlist();
      })
    })
  }

  openFavItem(item){
    console.log(item);
    
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
