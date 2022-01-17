import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private _snackBar: MatSnackBar) { }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  passwordReset(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logOut() {
    return this.afAuth.signOut();
  }

  saveToken() {
    this.afAuth.idToken.subscribe(token => {
      if(token) localStorage.setItem('token', token);
    });
  }

  clearToken() {
    localStorage.clear();
  }

  openSnackBar(message: string, className: string) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: className
    });
  }

  authenticationError(error: string) {
    // Firebase error is something like: Firebase: Password should be at least 6 characters (auth/weak-password) and
    // we want to show: Weak password
    const slash = error.indexOf('/');
    const closingParenthesis = error.indexOf(')');
    const errorMessage = error.substring(slash + 1, closingParenthesis).split('-').join(' ');
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
  }
}
