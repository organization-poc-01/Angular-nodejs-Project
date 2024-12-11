import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../types/books';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),
    short_description: new FormControl('', [Validators.required]),
    long_description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  bookId: string = '';

  constructor(
    
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router

    
  ) {}
  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );

  }
  get isYearInvalid() {
    return (
      this.form.get('year')?.touched &&
      this.form.get('year')?.errors?.['pattern']
    );
  }

  ngOnInit(): void {

    this.bookId = this.route.snapshot.paramMap.get('id')!;
    
  
    this.apiService.getSingleBook(this.bookId).subscribe((book: Book) => {
      this.form.patchValue({
        title: book.title,
        author: book.author,
        year: book.year.toString(),
        short_description: book.short_description,
        long_description: book.long_description,
        image: book.image,
      });
    });
  }

  editBook() {
    if (this.form.invalid) {
      return;
    }

    const { title, author, year, short_description, long_description, image } =
      this.form.value;

 
    this.apiService.updateBook(this.bookId, {
        title: title!,
        author: author!,
        year: Number(year),
        short_description: short_description!,
        long_description: long_description!,
        image: image!,
      })
      .subscribe(() => {
        this.router.navigate([`/books/${this.bookId}`]);
      });
  }
}
