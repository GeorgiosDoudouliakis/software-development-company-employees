import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { Employee } from '@shared/models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { FirebaseError } from '@firebase/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedMethodsService } from '@shared/services/shared-methods.service';
import { GetUpdateCompanyService } from '@shared/services/get-update-company.service';
import { CompanyDetailsComponent } from '../company-details/company-details.component';
import { UploadCompanyLogoDialogComponent } from '../upload-company-logo-dialog/upload-company-logo-dialog.component';
import { Company } from '@shared/models/company.model';
import { GetUpdateEmployeeService } from '@shared/services/get-update-employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  company: Company;
  companyId: string;
  employees: Employee[];
  private destroy$ = new Subject();

  constructor(
    private dialog: MatDialog, 
    public employeesService: EmployeesService,
    private getUpdateEmployeeService: GetUpdateEmployeeService,
    private sharedMethodsService: SharedMethodsService,
    private getUpdateCompanyService: GetUpdateCompanyService
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
    this.getUpdateCompanyService.company.pipe(takeUntil(this.destroy$))
        .subscribe((companies: any) => {
          if(companies.length > 0) {
            const { name, founder, description, services, projects, logo, id } = companies[0]; 
            this.company = { name, founder, description, services, projects, logo };
            this.companyId = id;
          }
        });
  }

  getEmployees() {
    this.getUpdateEmployeeService.employees.pipe(takeUntil(this.destroy$)).subscribe(res => this.employees = res);
  }

  addEmployee() {
    if(this.company && this.company.projects?.length === 0) {
      this.sharedMethodsService.openSnackBar("Please add projects to your profile in order to continue!", "info");
      return;
    }

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

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadCompanyLogoDialogComponent, { width: '400px', data: {} });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(url => {
      if(url) {
        this.getUpdateCompanyService.updateCompany(this.companyId, { ...this.company, logo: url.url })
          .then(_ => { 
            this.sharedMethodsService.openSnackBar("Company logo updated successfully!", "success");
          })
          .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
      }
    })
  }

  openCompanyDetailsDialog() {
    this.dialog.open(CompanyDetailsComponent, { width: '450px' });
  }
}