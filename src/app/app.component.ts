import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-career-portal';

  authService:AuthService
  constructor(private a: AuthService) {
    this.authService = a;

  }
  onLogout() {
    this.authService.logout();
    location.reload()
  }
}
