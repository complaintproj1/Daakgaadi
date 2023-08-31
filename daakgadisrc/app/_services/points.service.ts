import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(
    private http: HttpClient
  ) { }

  getPointsValue(){
    return this.http.get<[]>("https://vakeemagro.el.r.appspot.com/api/points/get");
  };
}
