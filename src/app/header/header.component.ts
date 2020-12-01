import { Component, OnInit } from '@angular/core';
import {AuthService} from '../autServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logoutUser();
  }

}
