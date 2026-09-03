import { Component } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginform: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  showAlert: boolean = false;

  constructor(
    private userservice: UserServices,
    private fb: FormBuilder
  ) {

    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  login(){

    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginform.value;

    this.userservice.login(email, password).subscribe({

      next: (res) => {

        this.loginResult(res);
        console.log(res);
        this.userservice.settoken(res.token);


        // Router
        // this.router.navigate(['/home']);

    },

      error: (err) => {

        this.loginResult(null);
        console.log(err);


      }

    });

  }

loginResult(res: any): void {

  this.showAlert = true;

  if (res?.token) {
    this.userservice.settoken(res.token);

    this.alertMessage = 'Login Successful';
    this.alertType = 'success';

  } else {

    this.alertMessage = 'Invalid Data';
    this.alertType = 'danger';

  }

}

}
