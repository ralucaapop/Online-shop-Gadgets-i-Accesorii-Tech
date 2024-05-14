import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ConfigurationsService } from "../services/configurations.service";
import { CustomerService } from "../services/customer.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    reTypePassword: new FormControl('', [Validators.required]),
  });

  viewType: string = 'login';

  constructor(public appConfig: ConfigurationsService, private authService: AuthService, private customer: CustomerService, private router: Router) {

  }

  onViewTypeChange(viewType: string): void {
    this.viewType = viewType;
  }

  onLogIn(): void {
    this.authService.logIn(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.message != 'Bad credentials!') {
          console.log('Login with success!');
          this.customer.setLoggedUser(response.data);

          this.resetLoginForm();

          this.router.navigate(['/', 'home']);
        } else {
          alert(response.message);
        }
      },
      (err) => {
        console.log('Login with failed!');
        alert('Invalid credentials!');
        console.log(err);
      }
    );
  }

  onRegister(): void {

    const password = this.registerForm.value.password;
    const patter_for_letters= /.*[a-zA-Z].*/;
    const patter_for_specialChars = /.*[?\-\.=_{};:].*/;
    const patter_for_digit = /.*\d+.*/;
    const regex_for_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const emailV =this.registerForm.value.email;
    if (!regex_for_email.test(emailV))
    {      alert('Invalid email address');
    }
    else if (this.registerForm.value.password.length < 8) {
      alert('Password must be at least 8 characters long');
    }
    else if (!patter_for_digit.test(password)) {
      alert('The password must contain at least a digit');
    } else if (!patter_for_specialChars.test(password)) {
      alert('The password must contain at least a special character(?.={},;:) ');
    } else if (!patter_for_letters.test(password)) {
      alert('The password must contain at least a letter');
    }     if (this.registerForm.value.password != this.registerForm.value.reTypePassword)
    {
      alert('Passwords do not match');
    }
    else {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Register with success!');

          this.viewType = 'login';
          this.resetRegisterForm();

          console.log(response);
        },
        (err) => {
          console.log('Register with failed!');
          console.log(err);
        }
      );
    }
  }

  getErrorMessage(formControl: any) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl.hasError('email') ? 'Not a valid email' : '';
  }

  private resetLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private resetRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      reTypePassword: new FormControl('', [Validators.required]),
    });
  }

}
