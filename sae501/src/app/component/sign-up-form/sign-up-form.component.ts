import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageError } from '../form-error/message-error';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/models/user-data';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent{
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errors: MessageError[] = [];
  isSubmit: boolean = false;

  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  showHidePassword(){
    this.showPassword = !this.showPassword;
  }
  showHideConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(){
    this.isSubmit = true;
    if (this.signUpForm.valid && this.isPasswordMatchConfirmPassword()){
      console.log(this.signUpForm.value);
      let user: User = {
        "firstName": this.signUpForm.value.firstName,
        "lastName": this.signUpForm.value.lastName,
        "email": this.signUpForm.value.email,
        "phone": this.signUpForm.value.phone,
        "password": this.signUpForm.value.password
      }
      this.authentication.registration(user);
      this.authentication.getErrors$().subscribe((errors) => {
        console.log(errors);
        errors.forEach((error) => {
          this.errors.push(error);
        });
      });
    }
  }

  isPasswordMatchConfirmPassword(): boolean{
    return this.signUpForm.get("password")?.value === this.signUpForm.get("confirmPassword")?.value;
  }

  isAllInputRequired(): boolean{
    if (
      this.signUpForm.get('firstName')?.hasError('required') &&
      this.signUpForm.get('lastName')?.hasError('required') &&
      this.signUpForm.get('email')?.hasError('required') &&
      this.signUpForm.get('phone')?.hasError('required') &&
      this.signUpForm.get('password')?.hasError('required') &&
      this.signUpForm.get('confirmPassword')?.hasError('required')
    ){
      return true;
    } else {
      return false;
    }
  }

  constructor(protected authentication: AuthenticationService){
    this.errors = [
      {
        condition: () => this.signUpForm.get('firstName')?.hasError('required') && !this.isAllInputRequired(),
        message: "Le champs prénom est requis"
      },
      {
        condition: () => this.signUpForm.get('lastName')?.hasError('required')  && !this.isAllInputRequired(),
        message: "Le champs nom est requis"
      },
      {
        condition: () => this.signUpForm.get('email')?.hasError('required')  && !this.isAllInputRequired(),
        message: "Le champs email est requis"
      },
      {
        condition: () => this.signUpForm.get('phone')?.hasError('required')  && !this.isAllInputRequired(),
        message: "Le champs téléphone est requis"
      },
      {
        condition: () => this.signUpForm.get('password')?.hasError('required')  && !this.isAllInputRequired(),
        message: "Le champs mot de passe est requis"
      },
      {
        condition: () => this.signUpForm.get('confirmPassword')?.hasError('required')  && !this.isAllInputRequired(),
        message: "Le champs confirmation est requis"
      },
      {
        condition: () => this.isAllInputRequired(),
        message: "Tous les champs sont requis"
      },
      {
        condition: () => this.signUpForm.get('email')?.hasError('email'),
        message: "Veuillez renseigner un email valide"
      },
      {
        condition: () => this.signUpForm.get('password')?.hasError('minlength'),
        message: "Le mot de passe doit avoir 5 caractères minimum"
      },
      {
        condition: () => !this.isPasswordMatchConfirmPassword(),
        message: "Le mot de passe et sa confirmation ne correspondent pas"
      },
      {
        condition: () => this.signUpForm.get('phone')?.hasError('pattern'),
        message: "Veuilez renseigner un téléphone valide"
      }
    ];
  }
}
