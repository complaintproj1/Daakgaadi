import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}
  

  addProductForm: FormGroup = new FormGroup({
    pname: new FormControl("", Validators.required),
    pcat: new FormControl("", Validators.required),
    aprice: new FormControl(null, Validators.required),
    dprice: new FormControl(null, Validators.required),
    pdes: new FormControl("", Validators.required),
  });

  addProduct(data, id) {
    console.log(data);

    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/products/addproduct",
      data,
      {
        params: {
          adminkey: id,
        },
      }
    );
  }

  updateDprice(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/products/updatedprice",
      data
    );
  }

  deleteProduct(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/products/deleteproduct",
      data
    );
  }

  pOffer(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/products/addsuperproduct?adminkey=62205f275d91e88127f97061",
      data
    );
  }

  getSuper() {
    return this.http.get(
      "https://vakeemagro.el.r.appspot.com/api/products/getsuper"
    );
  }

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    image: new FormControl("", Validators.required),
  });

  getCategories() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/category/getcategories"
    );
  }

  addCategory(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/category/addcategories",
      data
    );
  }

  deleteCategory(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/category/deletecategory",
      data
    );
  }

  addOfferForm: FormGroup = new FormGroup({
    tittle: new FormControl("", Validators.required),
    discount: new FormControl("", Validators.required),
    addes: new FormControl("", Validators.required),
  });

  getAllOffers() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/images/getbanners"
    );
  }

  getCustomers() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/users/getUsers"
    );
  }

  addImage(image): Observable<{}> {
    const formData = new FormData();
    formData.append("file", image);
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/upload/addfiles?adminkey=62205f275d91e88127f97061",
      formData
    );
  }

  getAllOrders() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/orders/getallorders"
    );
  }

  addOffer(data) {
    console.log(data);

    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/images/addbanners",
      data
    );
  }

  deleteOffer(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/images/deletebanner",
      data
    );
  }
}
