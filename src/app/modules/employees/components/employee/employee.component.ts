import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FirebaseError } from '@firebase/util';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {}

  onDelete(employeeId: string | undefined) {
    this.employeesService.deleteEmployee(employeeId)
      .then(_ => this.employeesService.openSnackBar('Employee has been successfully deleted!', 'success'))
      .catch((err: FirebaseError) => this.showErrorMessage(err))
  }

  private showErrorMessage(err: FirebaseError) {
    this.employeesService.openSnackBar(this.employeesService.authenticationError(err.message), 'error');
  }
}
