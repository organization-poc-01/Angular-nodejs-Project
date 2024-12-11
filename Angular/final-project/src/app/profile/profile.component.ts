import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { Book } from '../types/books';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[BookComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  books: Book[] = [];

  constructor(private userService: UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.username = user.username;
        if (user.books && user.books.length > 0) {
          console.log(this.books)
          this.apiService.getBooks().subscribe((allBooks) => {
            this.books = allBooks.filter((book) => user.books.includes(book._id));
          });
        }
      },
      error: (err) => console.error('Error fetching user profile:', err),
    });
  }
}
