import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, age, password } = this.registerForm.value;

      this.http.post('http://localhost:3000/api/register', { name, age, password }).subscribe({
        next: (response: any) => {
          console.log('Response from server:', response);
          this.successMessage = response.message;
          this.errorMessage = null;

          // Redirect after successful registration
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          console.error(err);
          this.successMessage = null;
          this.errorMessage = err.error.message || 'An error occurred during registration.';
        },
      });
    }
  }
}
