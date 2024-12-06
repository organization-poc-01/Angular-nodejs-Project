import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../types/books';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, CommonModule, SpinnerComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router 
  ) {}
  
  get isBookOwner(): boolean {
    const userBooks = this.userService.user?.books || [];
    return userBooks.includes(this.book._id);
  }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.apiService.getSingleBook(bookId).subscribe((book) => {
        this.book = book;
        this.isLoading = false;
      }); 
    }
  }



  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.apiService.deleteBook(this.book._id).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    }
  }

  get isLoadingValue() {
    return this.isLoading;
  }

  get bookData() {
    return this.book;
  }
}
