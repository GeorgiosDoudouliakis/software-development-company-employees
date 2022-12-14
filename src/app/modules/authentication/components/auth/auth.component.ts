import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedMethodsService } from '@shared/services/shared-methods.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  @Input() authType: 'login' | 'signup';
  authForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder, 
    public router: Router, 
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedMethodsService: SharedMethodsService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    if(this.authType === 'signup') {
      this.authForm.addControl('confirmPassword', this.fb.control('', [Validators.required, Validators.minLength(10)]));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(email => {
      if(email) {
        this.authService.passwordReset(email)
        .then(_ => this.sharedMethodsService.openSnackBar('An email for password reset has been sent to you!', 'info'))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
      }
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
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
    } else if(this.authType === 'login') {
      this.authService.logIn(email, password)
        .then(_ => this.onSuccess('You are now logged in!'))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
    }
  }

  private onSuccess(msg: string) {
    this.sharedMethodsService.openSnackBar(msg, 'success');
    this.router.navigate(['/company-profile']);
  }
}