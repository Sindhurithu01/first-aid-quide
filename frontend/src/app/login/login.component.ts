import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}
   onSubmit() {
    // Here you can add authentication logic
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(['/view-topics']);
  }
}
