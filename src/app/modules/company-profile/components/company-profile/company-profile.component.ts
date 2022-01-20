import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetCompanyService } from '@shared/services/get-company.service';
import { SharedMethodsService } from '@shared/services/shared-methods.service';
import { FirebaseError } from '@firebase/util';
import { Subject } from 'rxjs';
import { CompanyProfileActionsService } from '../../services/company-profile-actions.service';
import { AddServiceProjectDialogComponent } from '../add-service-project-dialog/add-service-project-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnDestroy {
  name: string;
  founder: string;
  description: string;
  services: string[];
  projects: string[];
  logo: string;
  companyId: string;
  private destroy$ = new Subject()

  constructor(
    private getCompanyService: GetCompanyService, 
    private dialog: MatDialog,
    private companyProfileActionsService: CompanyProfileActionsService,
    private sharedMethodsService: SharedMethodsService
  ) { }

  ngOnInit(): void {
    this.getCompanyService.company.pipe(takeUntil(this.destroy$)).subscribe((company: any) => {
      const { name, founder, description, services, projects, logo, id } = company[0];
      this.name = name || '';
      this.founder = founder || '';
      this.description = description || '';
      this.services = services || [];
      this.projects = projects || [];
      this.logo = logo || '';
      this.companyId = id;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get companyActionButton() {
    if(this.name === '' && this.founder === '' && this.description === '' && this.services.length === 0 && this.projects.length === 0 && this.logo === '') {
      return 'Submit';
    } else if(this.name !== '' && this.founder !== '' && this.description !== '' && this.services.length > 0 && this.projects.length > 0 && this.logo !== '') {
      return 'Update';
    }
    return '';
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

  clearFields() {
    this.name = '';
    this.founder = '';
    this.description = '';
    this.services = [];
    this.projects = [];
    this.logo = '';
  }

  onSubmit() {
    if(this.companyActionButton === 'Submit' && this.isValid()) {
      this.companyProfileActionsService.addCompany({
        name: this.name,
        founder: this.founder,
        description: this.description,
        services: this.services,
        projects: this.projects,
        logo: this.logo
      }).then(_ => this.sharedMethodsService.openSnackBar("Your company's details have been successfully added!", "success"))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
    } else if(this.companyActionButton === 'Update' && this.isValid()) {
      this.companyProfileActionsService.updateCompany(this.companyId, {
        name: this.name,
        founder: this.founder,
        description: this.description,
        services: this.services,
        projects: this.projects,
        logo: this.logo
      }).then(_ => this.sharedMethodsService.openSnackBar("Your company's details have been successfully updated!", "success"))
        .catch((err: FirebaseError) => this.sharedMethodsService.showErrorMessage(err));
    }
  }

  private isValid() {
    return (this.name 
            && this.founder 
            && this.description 
            && this.services.length > 0 
            && this.projects.length > 0 
            && this.logo
    );
  }
}