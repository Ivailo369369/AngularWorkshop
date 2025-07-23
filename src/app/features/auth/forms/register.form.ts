import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class RegisterFormService {
    private formBuilder = inject(FormBuilder);

    createForm(): FormGroup {
        return this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
            phone: [''],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                rePassword: ['', [Validators.required]],
            }, { validators: this.passwordMatchValidator })
        })
    }

    getUsernameControl(form: FormGroup) {
        return form.get('username');
    }

    getEmailControl(form: FormGroup) {
        return form.get('email');
    }

    getPhoneControl(form: FormGroup) {
        return form.get('phone');
    }

    getPasswordsGroup(form: FormGroup) {
        return form.get('passwords') as FormGroup;
    }

    getPasswordControl(form: FormGroup) {
        return this.getPasswordsGroup(form).get('password');
    }

    getRePasswordControl(form: FormGroup) {
        return this.getPasswordsGroup(form).get('rePassword');
    }

    isUsernameError(form: FormGroup): boolean {
        const control = this.getUsernameControl(form);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    isEmailError(form: FormGroup): boolean {
        const control = this.getEmailControl(form);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    isPasswordError(form: FormGroup): boolean {
        const passwordsGroup = this.getPasswordsGroup(form);
        return passwordsGroup?.invalid && (passwordsGroup?.dirty || passwordsGroup?.touched) || false;
    }

    isRePasswordError(form: FormGroup): boolean {
        const passwordsGroup = this.getPasswordsGroup(form);
        return passwordsGroup?.invalid && (passwordsGroup?.dirty || passwordsGroup?.touched) || false;
    }

    getUsernameErrorMessage(form: FormGroup): string {
        const control = this.getUsernameControl(form);
        if (control?.errors?.['required']) {
            return 'Username is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Username should have at least 5 symbols!';
        }
        return '';
    }

    getEmailErrorMessage(form: FormGroup): string {
        const control = this.getEmailControl(form);
        if (control?.errors?.['required']) {
            return 'Email is required!';
        }
        if (control?.errors?.['invalidGmail']) {
            return 'Email should be a valid Gmail address!';
        }
        return '';
    }

    getPasswordErrorMessage(form: FormGroup): string {
        const control = this.getPasswordControl(form);
        const passwordsGroup = this.getPasswordsGroup(form);

        if (control?.errors?.['required']) {
            return 'Password is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Password should be at least 5 characters!';
        }
        if (control?.errors?.['pattern']) {
            return 'Password should contain only English letters and digits!';
        }
        if (passwordsGroup?.errors?.['passwordMismatch']) {
            return 'Passwords do not match!';
        }
        return '';
    }

    getRePasswordErrorMessage(form: FormGroup): string {
        const control = this.getRePasswordControl(form);
        const passwordsGroup = this.getPasswordsGroup(form);

        if (control?.errors?.['required']) {
            return 'Repeat Password is required!';
        }
        if (passwordsGroup?.errors?.['passwordMismatch']) {
            return 'Passwords do not match!';
        }
        return '';
    }

    isFormValid(form: FormGroup): boolean {
        return form.valid;
    }

    getFormValue(form: FormGroup) {
        const { username, email, phone } = form.value;
        const { password, rePassword } = form.value.passwords;

        return {
            username,
            email,
            phone,
            password,
            rePassword
        };
    }

    markFormTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control instanceof FormGroup) {
                Object.keys(control.controls).forEach(nestedKey => {
                    const nestedControl = control.get(nestedKey);
                    nestedControl?.markAsTouched();
                });
            } else {
                control?.markAsTouched();
            }
        });
    }

    private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
        const password = passwordsControl.get('password');
        const rePassword = passwordsControl.get('rePassword');

        if (password && rePassword && password.value !== rePassword.value) {
            return { passwordMismatch: true };
        }

        return null;
    }
}