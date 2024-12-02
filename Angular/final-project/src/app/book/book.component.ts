import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../types/books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book!: Book; 
  
}
