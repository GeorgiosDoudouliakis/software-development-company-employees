import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetCompanyService } from '@shared/services/get-company.service';
import { Subscription } from 'rxjs';
import { AddServiceProjectDialogComponent } from '../add-service-project-dialog/add-service-project-dialog.component';

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

  constructor(private getCompanyService: GetCompanyService, private dialog: MatDialog) { }

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

  onAdd(type: 'service' | 'project') {
    const data = type === 'service' ? { type, service: '' } : { type, project: '' };

    const dialogRef = this.dialog.open(AddServiceProjectDialogComponent, {
      width: '350px',
      data
    })
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