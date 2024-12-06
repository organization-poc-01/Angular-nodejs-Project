import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './types/books'; 
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getBooks() {
    return this.http.get<Book[]>(`/api/books`);
  }

  getSingleBook(id: string) {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  updateBook(bookId: string, updatedData: Partial<Book>) {
    return this.http.patch<Book>(`/api/books/${bookId}`, updatedData);
  }

  deleteBook(bookId: string) {
    return this.http.delete(`/api/books/${bookId}`);
  }

  addBook(title: string, author: string, year: number, short_description: string, long_description: string, image: string) {
    return this.http.post<Book>('/api/books', { title, author, year, short_description, long_description, image }).pipe(
      tap((newBook) => {
        if (this.userService.user) {
          this.userService.user.books.push(newBook._id);
        }
      })
    );
  }
}
