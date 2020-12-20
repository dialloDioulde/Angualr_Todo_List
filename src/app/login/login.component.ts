import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService} from '../autServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    // On gére la Validation du Formulaire ici
    this.userLoginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }

  // Grâce à cette fonction on peut accéder aux validations dans le html correspondant
  get fieldValidation() {
    return this.userLoginForm.controls;
  }

  // Grâce à cette fonction on détecte la soumission du formulaire
  onSubmit() {
    this.submited = true;
    if (this.userLoginForm.invalid) { // Si la validation des données saisies rapporte des erreurs
      return;
    } else { // On appelle la fonction qui permet d'établir la Connexion de l'Utilisateur
      this.authService.loginUser(this.userLoginForm.value);
    }
  }


}
