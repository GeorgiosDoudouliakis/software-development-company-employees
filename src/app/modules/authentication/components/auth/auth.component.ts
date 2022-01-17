import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  @Input() authType: 'login' | 'signup';
  authForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder, 
    public router: Router, 
    private dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.authType === 'signup') {
      this.authForm.addControl('confirmPassword', this.fb.control('', [Validators.required, Validators.minLength(10)]));
    }
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get confirmPassword() {
    return this.authForm.get('confirmPassword');
  }

  get emailErrorMessage() {
    if(this.email?.hasError('email')) {
      return 'Not a valid email';
    } 
    return 'Email is required';
  }

  initializeForm() {
    this.authForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(10)]),
    })
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(email => {
      this.authService.passwordReset(email)
        .then(_ => this.authService.openSnackBar('An email for password reset has been sent to you!', 'info'))
        .catch((err: FirebaseError) => this.showErrorMessage(err));
    });
  }

  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;

    if(this.authType === 'signup' 
    && this.authForm.valid 
    && this.password?.value === this.confirmPassword?.value) {
      this.authService.signUp(email, password)
        .then(_ => this.onSuccess('You have successfully signed in!'))
        .catch((err: FirebaseError) => this.showErrorMessage(err));
    } else if(this.authType === 'login') {
      this.authService.logIn(email, password)
        .then(_ => this.onSuccess('You are now logged in!'))
        .catch((err: FirebaseError) => this.showErrorMessage(err));
    }
  }

  private onSuccess(msg: string) {
    this.authService.openSnackBar(msg, 'success');
    this.authService.saveToken();
    this.router.navigate(['/employees']);
  }

  private showErrorMessage(err: FirebaseError) {
    this.authService.openSnackBar(this.authService.authenticationError(err.message), 'error');
  }
}