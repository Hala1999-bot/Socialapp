import { UserService } from './../services/user.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { routes } from '../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  msgError: string = '';
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/),
      ]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(0?[1-9]|[12]\d|3[01])[\/.-](0?[1-9]|1[0-2])[\/.-](19|20)\d{2}$/),
      ]),
      gender: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(m|M|male|Male|f|F|female|Female)$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.userService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/login']);
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

      console.log(this.registerForm.value);
    }
  }
}
