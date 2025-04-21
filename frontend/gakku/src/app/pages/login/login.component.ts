import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private apiService: ApiService,
  ) {}

  handleLogin(credentials: { username: string; password: string }) {
    this.apiService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        console.log('Login successful, navigating to / with full reload...');
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    });
  }
}