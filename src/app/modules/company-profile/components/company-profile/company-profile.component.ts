import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetUpdateCompanyService } from '@shared/services/get-update-company.service';
import { SharedMethodsService } from '@shared/services/shared-methods.service';
import { FirebaseError } from '@firebase/util';
import { Subject } from 'rxjs';
import { AddCompanyService } from '../../services/add-company.service';
import { AddServiceProjectDialogComponent } from '../add-service-project-dialog/add-service-project-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Company } from '@shared/models/company.model';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnDestroy {
  name: string = '';
  founder: string = '';
  description: string = '';
  services: string[] = [];
  projects: string[] = [];
  companyId: string;
  private destroy$ = new Subject()

  constructor(
    private seoService: SeoService, 
    private dialog: MatDialog,
    private addCompanyService: AddCompanyService,
    private getUpdateCompanyService: GetUpdateCompanyService,
    private sharedMethodsService: SharedMethodsService
  ) { 
    this.seoService.generateTags([{ name: 'description' , content: "Add your company's details like it's brand name, founder, a description about it, services and projects" }], 'Company Profile');
  }

  ngOnInit(): void {
    this.getCompany();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get companyActionButton() {
    if(this.companyId) {
      return 'Update';
    }
    return 'Submit';
  }

  getCompany() {
    this.getUpdateCompanyService.company.pipe(takeUntil(this.destroy$)).subscribe((companies: any) => {
      if(companies.length > 0) {
        const { name, founder, description, services, projects, id } = companies[0];
        this.name = name || '';
        this.founder = founder || '';
        this.description = description || '';
        this.services = services || [];
        this.projects = projects || [];
        this.companyId = id;
      }
    });
  }

  onAdd(type: 'service' | 'project') {
    const data = type === 'service' ? { type, service: '' } : { type, project: '' };

    const dialogRef = this.dialog.open(AddServiceProjectDialogComponent, {
      width: '350px',
      data
    })

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(res => {
      if(res) {
        if(type === 'service') {
          this.services.push(res);
        } else if(type === 'project') {
          this.projects.push(res);
        }
      }
    })
  }

  onDelete(type: 'service' | 'project', index: number) {
    if(type === 'service') {
      this.services.splice(index, 1);
    } else if(type === 'project') {
      this.projects.splice(index, 1);
    }
  }

  clearFields() {
    this.name = '';
    this.founder = '';
    this.description = '';
    this.services = [];
    this.projects = [];
  }

  onSubmit() {
    const company = { 
      name: this.name,
      founder: this.founder,
      description: this.description,
      services: this.services,
      projects: this.projects
    }

    if(!this.companyId) {
      this.addCompany(company);
    } else {
      this.updateCompany(company);
    }
  }

  private addCompany(company: Company) {
    this.addCompanyService.addCompany({ ...company })
        .then(_ => this.sharedMethodsService.openSnackBar("Your company's details have been successfully added!", "success"))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
  }

  private updateCompany(company: Company) {
    this.getUpdateCompanyService.updateCompany(this.companyId, { ...company })
        .then(_ => this.sharedMethodsService.openSnackBar("Your company's details have been successfully updated!", "success"))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
  }
}