import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FirebaseError } from '@firebase/util';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private dialog: MatDialog, private employeesService: EmployeesService) { }

  ngOnInit(): void {}

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: {}
    })

    dialogRef.afterClosed().subscribe((employee: Employee) => {
      if(employee) {
        this.employeesService.addEmployee(employee)
          .then(_ => this.employeesService.openSnackBar('Employee succesfully added', 'success'))
          .catch((err: FirebaseError) => this.showErrorMessage(err));
      }
    })
  }

  private showErrorMessage(err: FirebaseError) {
    this.employeesService.openSnackBar(this.employeesService.authenticationError(err.message), 'error');
  }
}