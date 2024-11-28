import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, BookComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {

  books = [
    {
      title: 'Dummy Book Title',
      description: 'This is a dummy description of the book.',
      imageUrl: 'assets/dummy-book.jpg', // Replace with actual image URL
    },
  ];
}
