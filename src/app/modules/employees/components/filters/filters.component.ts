import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  availableSpecialities: string[] = [];
  availableProjects: string[];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.availableSpecialities = this.employeesService.availableSpecialities;
    this.availableProjects = this.employeesService.availableProjects;
  }

}
