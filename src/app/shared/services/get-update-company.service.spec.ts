import { TestBed } from '@angular/core/testing';

import { GetUpdateCompanyService } from './get-update-company.service';

describe('GetUpdateCompanyService', () => {
  let service: GetUpdateCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUpdateCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
