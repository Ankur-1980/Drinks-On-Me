import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterValidationService } from 'src/app/services/register-validation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  messageTimeout: number;

  constructor(
    private fb: FormBuilder,
    private registerValidation: RegisterValidationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, this.registerValidation.patternValidator()],
      ],
      loginDate: this.fb.control(new Date()),
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
  }

  checkLoginMessage() {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'] ? params['message'] : null;

      this.messageTimeout = window.setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge',
        });

        this.message = '';
      }, 3000);
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
