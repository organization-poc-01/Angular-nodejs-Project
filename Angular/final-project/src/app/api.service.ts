import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Book } from './types/books'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooks() {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/books`);
  }

  getSingleBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/books/${id}`);
  }
}
