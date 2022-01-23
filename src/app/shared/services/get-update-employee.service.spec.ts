import { TestBed } from '@angular/core/testing';

import { GetUpdateEmployeeService } from './get-update-employee.service';

describe('GetUpdateEmployeeService', () => {
  let service: GetUpdateEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUpdateEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
