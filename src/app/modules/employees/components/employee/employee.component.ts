import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseError } from '@firebase/util';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) { }

  ngOnInit(): void {}

  onDelete(employeeId: string | undefined) {
    this.employeesService.deleteEmployee(employeeId)
      .then(_ => this.employeesService.openSnackBar('Employee has been successfully deleted!', 'success'))
      .catch((err: FirebaseError) => this.showErrorMessage(err))
  }

  openEdit(employee: Employee) {
    const { firstName, lastName, age, contractType, speciality, projects } = employee;

    this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: { firstName, lastName, age, contractType, speciality, projects }
    })
  }

  private showErrorMessage(err: FirebaseError) {
    this.employeesService.openSnackBar(this.employeesService.authenticationError(err.message), 'error');
  }
}
