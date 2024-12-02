import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../types/books';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.apiService.getSingleBook(bookId).subscribe((book) => {
        this.book = book;
        this.isLoading = false;
      });
    }
  }
}
