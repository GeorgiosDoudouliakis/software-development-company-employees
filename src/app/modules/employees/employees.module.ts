import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddEmployeeDialogComponent } from './components/add-employee-dialog/add-employee-dialog.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ShowCustomizeBtnDirective } from './directives/show-customize-btn.directive';
import { ShowAddEmployeeBtnTextDirective } from './directives/show-add-employee-btn-text.directive';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';

const routes = [
  { path: '', component: EmployeesComponent , canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    EmployeesComponent,
    AddEmployeeDialogComponent,
    EmployeeComponent,
    ShowCustomizeBtnDirective,
    ShowAddEmployeeBtnTextDirective,
    RemoveSpacesPipe
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