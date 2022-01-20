import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FirebaseError } from '@firebase/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedMethodsService } from '@shared/services/shared-methods.service';
import { GetCompanyService } from '@shared/services/get-company.service';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  companyName: string;
  companyDescription: string;
  employees: Employee[];
  private destroy$ = new Subject();

  constructor(
    private dialog: MatDialog, 
    public employeesService: EmployeesService,
    private sharedMethodsService: SharedMethodsService,
    private getCompanyService: GetCompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanyDetails();
    this.getEmployees();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCompanyDetails() {
    this.getCompanyService.company.pipe(takeUntil(this.destroy$))
        .subscribe((companies: any) => {
          if(companies.length > 0) {
            this.companyName = companies[0].name;
            this.companyDescription = companies[0].description;
          }
        });
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
          .then(_ => this.sharedMethodsService.openSnackBar('Employee succesfully added', 'success'))
          .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
      }
    })
  }

  openCompanyDetailsDialog() {
    this.dialog.open(CompanyDetailsComponent, { width: '400px' });
  }
}