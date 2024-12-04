import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rePassword: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get rePassword() {
    return this.form.get('rePassword');
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    const { username, email, password, rePassword } = this.form.value;

    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    this.userService.register(username!, email!, password!, rePassword!).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
}
