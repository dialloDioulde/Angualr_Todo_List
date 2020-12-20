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
    // On gére la Validation du Formulaire ici
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.passwordMatch('password', 'confirmPassword') },
    );
  }

  // Grâce à cette fonction on peut accéder aux validations dans le html correspondant
  get fieldValidation() {
    return this.userForm.controls;
  }

  // Grâce à cette fonction on détecte la soumission du formulaire
  onSubmit() {
    this.submited = true;
    if (this.userForm.invalid) { // Si la validation des données saisies rapporte des erreurs
      return;
    } else { // On appelle la fonction qui permet de créer le compte de l'utilisateur
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
