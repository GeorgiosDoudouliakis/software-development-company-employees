import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddEmployeeDialogComponent } from './components/add-employee-dialog/add-employee-dialog.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ShowAddEmployeeBtnTextDirective } from './directives/show-add-employee-btn-text.directive';
import { UploadCompanyLogoDialogComponent } from './components/upload-company-logo-dialog/upload-company-logo-dialog.component';
import { ShowCustromizeLogoBtnDirective } from './directives/show-custromize-logo-btn.directive';

const routes = [
  { path: '', component: EmployeesComponent , canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeDialogComponent,
    EmployeeComponent,
    RemoveSpacesPipe,
    CompanyDetailsComponent,
    ShowAddEmployeeBtnTextDirective,
    UploadCompanyLogoDialogComponent,
    ShowCustromizeLogoBtnDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeesModule { }