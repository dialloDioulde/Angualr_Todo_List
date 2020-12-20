import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase';
import { User } from '../dataTypes/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Création de Compte Utilisateur
  registerUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            console.log('Oui je suis connecté');
            this.router.navigate(['/todo-list']);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Connexion Utilisateur
  loginUser(user: User) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log('Oui je suis connecté');
        this.router.navigate(['/todo-list']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // On vérifie que l'utilisateur est bien connecté ou non
  isAuthenticated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // Déconnexion de l'Utilisateur
  logoutUser() {
    firebase.auth().signOut();
    this.router.navigate(['/registerUser']);
  }



}
