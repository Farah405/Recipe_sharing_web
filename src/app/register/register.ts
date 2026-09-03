import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user-services';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  constructor(
    private userservice: UserServices,
    private fb: FormBuilder
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

  }

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.userservice.register(this.registerForm.value)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.userservice.settoken(res.token);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}
