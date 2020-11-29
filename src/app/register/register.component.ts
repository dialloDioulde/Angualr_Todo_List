import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService} from '../autServices/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  submited = false;


  constructor(private fb: FormBuilder, private authService: AuthService ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.passwordMatch('password', 'confirmPassword') },
    );
  }

  get fieldValidation() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submited = true;
    if (this.userForm.invalid) {
      return;
    } else {
      // On appelle la fonction qui permet de créer le compte de l'utilisateur
      this.authService.registerUser(this.userForm.value);
    }
  }


  // On gére la Correspondance des Mots de Passes Renseignés
  passwordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

    };
  }



}
