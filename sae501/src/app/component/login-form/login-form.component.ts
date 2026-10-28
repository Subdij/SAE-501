import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageError } from '../form-error/message-error';
import { User } from 'src/app/models/user-data';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  showPassword: boolean = false;
  errors: MessageError[] = [];
  isSubmit: boolean = false;

  showHidePassword(){
    this.showPassword = !this.showPassword;
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit(){
    this.isSubmit = true;
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      let user: User = {
        "email": value.email,
        "password": value.password
      };
      this.authentication.logIn(user);
      this.authentication.getErrors$().subscribe((errors) => {
        console.log("errors in login", errors);
        errors.forEach((error) => {
          this.errors.push(error);
        });
      });
    }
  }

  constructor(protected authentication: AuthenticationService){
    this.errors = [
      {
        condition: () => this.loginForm.get('email')?.hasError('email'),
        message: "Veuillez renseigner un email valide"
      },
      {
        condition: () => this.loginForm.get('email')?.hasError('required') && !(this.loginForm.get('email')?.hasError('required') && this.loginForm.get('password')?.hasError('required')),
        message: "Champ email requis"
      },
      {
        condition: () => this.loginForm.get('password')?.hasError('required') && !(this.loginForm.get('email')?.hasError('required') && this.loginForm.get('password')?.hasError('required')),
        message: "Champ mot de passe requis"
      },
      {
        condition: () => this.loginForm.get('email')?.hasError('required') && this.loginForm.get('password')?.hasError('required'),
        message: "Tous les champs sont requis"
      }
    ];
  }

}
