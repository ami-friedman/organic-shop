import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'organic-shop';

  constructor( private userService: UserService, private authService: AuthService) {
  }
}
