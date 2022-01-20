import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { AddServiceProjectDialogComponent } from './components/add-service-project-dialog/add-service-project-dialog.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes = [
  { path: '', component: CompanyProfileComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    CompanyProfileComponent,
    AddServiceProjectDialogComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyProfileModule { }
