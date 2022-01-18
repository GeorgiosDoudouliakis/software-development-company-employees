import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../models/employee.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  async addEmployee(data: Employee) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('employees').add({
      ...data,
      uid: user?.uid
    })
  }

  get employees() {
    return this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if(user) {
          return this.db.collection<Employee[]>('employees', (ref: any) => ref.where('uid', '==', user.uid))
                     .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  deleteEmployee(employeeId: string | undefined) {
    return this.db.collection('employees').doc(employeeId).delete();
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