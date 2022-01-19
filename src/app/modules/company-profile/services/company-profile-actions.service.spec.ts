import { TestBed } from '@angular/core/testing';

import { CompanyProfileActionsService } from './company-profile-actions.service';

describe('CompanyProfileActionsService', () => {
  let service: CompanyProfileActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProfileActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
