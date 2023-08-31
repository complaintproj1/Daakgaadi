import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  currRoute: string = '';
  currUser;

  constructor(private route: ActivatedRoute, private router: Router) {}

  logOut(){
    localStorage.removeItem('viaanMartUser');
    this.router.navigateByUrl('/sign-in');
  }

  ngOnInit(): void {
    this.getCurrentRoute();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getCurrentRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currRoute = (<NavigationEnd>event).url.split('/', 3)[2];
        console.log(this.currRoute);
      }
    });
  }
}
