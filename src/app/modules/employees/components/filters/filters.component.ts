import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  availableProjects: string[];
  @Output() selectedProjectHandler = new EventEmitter();

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.availableProjects = this.employeesService.availableProjects;
  }
}
