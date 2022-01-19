import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetCompanyService } from '@shared/services/get-company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnDestroy {
  name: string;
  founder: string;
  description: string;
  services: string[] = [];
  projects: string[] = [];
  logo: string;
  private companySub$: Subscription;

  constructor(private getCompanyService: GetCompanyService) { }

  ngOnInit(): void {
    this.companySub$ = this.getCompanyService.company.subscribe((company: any) => {
       const { name, founder, description, services, projects, logo } = company;
       this.name = name;
       this.founder = founder;
       this.description = description;
       this.services = services;
       this.projects = projects;
       this.logo = logo;
    });
  }

  ngOnDestroy() {
    this.companySub$?.unsubscribe();
  }

  clearFields() {
    this.name = '';
    this.founder = '';
    this.description = '';
    this.services = [];
    this.projects = [];
    this.logo = '';
  }
}