import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '@shared/models/company.model';
import { GetCompanyService } from '@shared/services/get-company.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  company: Company;
  private destroy$ = new Subject();

  constructor(private getCompanyService: GetCompanyService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCompany() {
    this.getCompanyService.company.pipe(takeUntil(this.destroy$)).subscribe((companies: any) => {
      if(companies.length > 0) {
        const { name, founder, description, services, projects, logo } = companies[0];
        this.company = { name, founder, description, services, projects, logo };
      }
    })
  }
}
