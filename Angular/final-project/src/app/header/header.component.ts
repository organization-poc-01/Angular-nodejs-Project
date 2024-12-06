import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  searchBook() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}
