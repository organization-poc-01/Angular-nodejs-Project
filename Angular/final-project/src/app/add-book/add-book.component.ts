import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
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

  constructor(private apiService: ApiService, private router: Router) {}

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

  addBook() {
    if (this.form.invalid) {
      return;
    }

    const { title, author, year, short_description, long_description, image } = this.form.value;
    const yearNumber = Number(year);

    this.apiService.addBook(title!, author!, yearNumber!, short_description!, long_description!, image!)
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    
  }
}
