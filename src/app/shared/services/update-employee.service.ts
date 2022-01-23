import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '@shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {

  constructor(private db: AngularFirestore) { }

  updateEmployee(employeeId: string | undefined, employee: Employee) {
    return this.db.collection('employees').doc(employeeId).update({ ...employee });
  }
}
