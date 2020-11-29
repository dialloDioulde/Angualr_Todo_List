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
    this.userLoginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }

  get fieldValidation() {
    return this.userLoginForm.controls;
  }

  onSubmit() {
    this.submited = true;
    if (this.userLoginForm.invalid) {
      return;
    } else {
      // On appelle la fonction qui permet d'établir la Connexion de l'Utilisateur
      this.authService.loginUser(this.userLoginForm.value);
    }
  }


}
