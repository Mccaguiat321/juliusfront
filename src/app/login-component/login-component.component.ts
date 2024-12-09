import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;
  
      this.http
        .post('http://localhost:3000/login', { name, password }, { withCredentials: true })
        .subscribe({
          next: (response: any) => {
            console.log('Login response:', response);
  
            if (response.message === 'Login successful') {
              // Save user info in localStorage
              localStorage.setItem('userName', response.userName);
              localStorage.setItem('userId', response.userId); // Save userId in localStorage
  
              // Navigate to the dashboard page (or any other page)
              this.router.navigate(['/pinagsama']);
            } else {
              // Handle unexpected response messages
              this.errorMessage = response.message || 'Login failed.';
            }
          },
          error: (error) => {
            console.error('Login error:', error);
  
            // Log more detailed error information
            if (error.response) {
              console.error('Error response:', error.response);
            }
  
            // Handle specific HTTP errors
            this.errorMessage =
              error.status === 404
                ? 'User not found.'
                : error.status === 401
                ? 'Incorrect password.'
                : 'An unexpected error occurred. Please try again.';
          },
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
  
  
}
