import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '@shared/models/employee.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUpdateEmployeeService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

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

  updateEmployee(employeeId: string | undefined, employee: Employee) {
    return this.db.collection('employees').doc(employeeId).update({ ...employee });
  }
}
