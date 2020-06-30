import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterValidationService {
  constructor() {}

  dupePassword(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const password2Control = formGroup.controls[password2];

      if (!passwordControl || !password2Control) {
        return null;
      }

      if (
        password2Control.errors &&
        !password2Control.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== password2Control.value) {
        password2Control.setErrors({ passwordMismatch: true });
      } else {
        password2Control.setErrors(null);
      }
    };
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
