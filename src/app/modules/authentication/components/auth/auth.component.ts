import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@firebase/util';

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
    private _snackBar: MatSnackBar
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
      this.afAuth.sendPasswordResetEmail(email)
        .then(_ => this.openSnackBar('An email for password reset has been sent to you!', 'info'))
        .catch((err: FirebaseError) => this.openSnackBar(this.authenticationError(err.message), 'error'));
    });
  }

  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;

    if(this.authType === 'signup' 
    && this.authForm.valid 
    && this.password?.value === this.confirmPassword?.value) {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(_ => this.openSnackBar('You have successfully signed in!', 'success'))
        .catch((err: FirebaseError) => this.openSnackBar(this.authenticationError(err.message), 'error'));
    } else if(this.authType === 'login') {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(_ => this.openSnackBar('You are now logged in!', 'success'))
        .catch((err: FirebaseError) => this.openSnackBar(this.authenticationError(err.message), 'error'));
    }
  }

  private openSnackBar(message: string, className: string) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: className
    });
  }

  private authenticationError(error: string) {
    // Firebase error is something like: Firebase: Password should be at least 6 characters (auth/weak-password)
    const slash = error.indexOf('/');
    const closingParenthesis = error.indexOf(')');
    const errorMessage = error.substring(slash + 1, closingParenthesis).split('-').join(' ');
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
  }
}