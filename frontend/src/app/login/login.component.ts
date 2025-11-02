import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  // ✅ Inject HttpClient for API call
  constructor(private router: Router, private http: HttpClient) {}

 onSubmit() {
  const userData = { username: this.username, password: this.password };

  this.http.post('https://first-aid-quide-12.onrender.com/login', userData)
    .subscribe({
      next: (response: any) => {
        console.log('Login response:', response);

        // Check response for success
        if (response.success) { // <- adjust based on your backend response
          this.router.navigate(['/view-topics']);
        } else {
          alert('Invalid credentials!');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Server error. Try again later.');
      }
    });
}
}