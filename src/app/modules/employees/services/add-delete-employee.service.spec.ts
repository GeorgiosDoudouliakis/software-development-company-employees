import { TestBed } from '@angular/core/testing';

import { AddDeleteEmployeesService } from './add-delete-employee.service';

describe('AddDeleteEmployeesService', () => {
  let service: AddDeleteEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDeleteEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
