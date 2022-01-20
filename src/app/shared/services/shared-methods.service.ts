import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseError } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, className: string) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: className
    });
  }

  showErrorMessage(err: FirebaseError) {
    this.openSnackBar(this.authenticationError(err.message), 'error');
  }

  capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  private authenticationError(error: string) {
    // Firebase error is something like: Firebase: Password should be at least 6 characters (auth/weak-password) and
    // we want to show: Weak password
    const slash = error.indexOf('/');
    const closingParenthesis = error.indexOf(')');
    const errorMessage = error.substring(slash + 1, closingParenthesis).split('-').join(' ');
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
  }
}
