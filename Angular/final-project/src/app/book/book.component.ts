import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() title: string = 'Book Title';
  @Input() description: string = 'This is a description of the book.';
  @Input() imageUrl: string = 'assets/dummy-book.jpg';
}