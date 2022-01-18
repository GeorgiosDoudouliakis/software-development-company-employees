import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FirebaseError } from '@firebase/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  private destroy$ = new Subject();

  constructor(private dialog: MatDialog, public employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getEmployees() {
    this.employeesService.employees.pipe(takeUntil(this.destroy$)).subscribe(res => this.employees = res);
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: {
        action: 'add'
      }
    })

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((employee: Employee) => {
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