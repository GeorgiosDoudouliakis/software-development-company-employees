import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '@shared/models/company.model';
import { GetUpdateCompanyService } from '@shared/services/get-update-company.service';
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

  constructor(private getUpdateCompanyService: GetUpdateCompanyService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCompany() {
    this.getUpdateCompanyService.company.pipe(takeUntil(this.destroy$)).subscribe((companies: any) => {
      if(companies.length > 0) {
        const { name, founder, description, services, projects } = companies[0];
        this.company = { name, founder, description, services, projects };
      }
    })
  }
}