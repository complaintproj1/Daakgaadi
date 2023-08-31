import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  currRoute;
  
  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  getCurrentRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currRoute = (<NavigationEnd>event).url.split('/', 3)[2];
        console.log(this.currRoute);
        this.authService.currRoute.next(this.currRoute);
      }
    });
  }
}
