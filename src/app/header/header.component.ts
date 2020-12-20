import { Component, OnInit } from '@angular/core';
import {AuthService} from '../autServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  // Permet de savoir si l'Utilisateur est connecté ou pas
  isAuth() {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
  }

  // Déconnexion de l'Utilisateur
  logoutUser() {
    this.authService.logoutUser();
  }

}
