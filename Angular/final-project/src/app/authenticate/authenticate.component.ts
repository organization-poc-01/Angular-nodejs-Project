import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }
}
