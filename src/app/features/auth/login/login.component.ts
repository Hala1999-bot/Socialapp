import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  msgError: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.userService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('token', res.token);
            console.log('Login Response:', res);

            this.router.navigate(['/timeline']);
          }
          console.log(res);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.error;
          this.isLoading = false;
        },
      });

      console.log(this.loginForm.value);
    }
  }
}
