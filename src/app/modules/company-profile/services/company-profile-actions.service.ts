import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '@shared/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileActionsService {
  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  async addCompany(data: Company) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('companies').add({
      ...data,
      uid: user?.uid
    })
  }

  updateCompany(companyId: string, company: Company) {
    return this.db.collection('companies').doc(companyId).update({ ...company });
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