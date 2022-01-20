import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../models/employee.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  availableSpecialities: string[] = ['Front End', 'Back End', 'Full Stack'];
  availableProjects: string[] = ['Tomi Systems', 'Pure Profile', 'VMWare'];

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore
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

  updateEmployee(employeeId: string | undefined, employee: Employee) {
    return this.db.collection('employees').doc(employeeId).update({ ...employee });
  }
}