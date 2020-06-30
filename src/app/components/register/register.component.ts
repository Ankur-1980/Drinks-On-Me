import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegisterValidationService } from '../../services/register-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerValidation: RegisterValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: [''],
        email: ['', [Validators.email, Validators.required]],
        userName: ['', Validators.required],
        age: ['', [Validators.min(21)]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.registerValidation.patternValidator(),
          ]),
        ],
        password2: ['', [Validators.required]],
        bio: [''],
        picture: [''],
        dateRegistered: this.fb.control(new Date()),
      },
      {
        validator: this.registerValidation.dupePassword(
          'password',
          'password2'
        ),
      }
    );
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.router.navigate(['/login'], {
      queryParams: {
        message: 'You have successfully registered! Please login to continue',
      },
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get email() {
    return this.registerForm.get('email');
  }
  get userName() {
    return this.registerForm.get('userName');
  }
  get age() {
    return this.registerForm.get('age');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get password2() {
    return this.registerForm.get('password2');
  }
}
