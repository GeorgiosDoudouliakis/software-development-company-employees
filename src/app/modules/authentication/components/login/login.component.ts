import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get passwordErrorMessage() {
    if(this.password?.hasError('email')) {
      return 'Not a valid email';
    } 
    return 'Password must contain at least 10 characters';
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.email,  Validators.minLength(10)])
    })
  }
}
