import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../../../shared/models/employee.model';

@Injectable()
export class EmployeesService {
  availableSpecialities: string[] = ['Front End', 'Back End', 'Full Stack'];

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

  deleteEmployee(employeeId: string | undefined) {
    return this.db.collection('employees').doc(employeeId).delete();
  }
}