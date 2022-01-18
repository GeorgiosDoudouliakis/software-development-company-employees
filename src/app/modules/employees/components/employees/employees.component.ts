import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FirebaseError } from '@firebase/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  showAddEmployeeText: boolean = false;
  private employeesSub$: Subscription;

  constructor(private dialog: MatDialog, public employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy() {
    this.employeesSub$?.unsubscribe();
  }

  getEmployees() {
    this.employeesSub$ = this.employeesService.employees.subscribe(res => {
      this.employees = res;
    })
  }

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