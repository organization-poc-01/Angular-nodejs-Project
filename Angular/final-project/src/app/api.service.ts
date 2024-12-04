import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './types/books'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  
  getBooks() {
    return this.http.get<Book[]>(`/api/books`);
  }

  
  getSingleBook(id: string) {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  
  updateBook(bookId: string, updatedData: Partial<Book>) {
    return this.http.put<Book>(`/api/books/${bookId}`, updatedData);
  }

  
  deleteBook(bookId: string) {
    return this.http.delete(`/api/books/${bookId}`);
  }
}
