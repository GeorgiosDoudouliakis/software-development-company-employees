import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthenticationModule { }
