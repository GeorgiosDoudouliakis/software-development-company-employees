import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

const routes = [
  { path: '', component: CompanyProfileComponent }
]

@NgModule({
  declarations: [
    CompanyProfileComponent
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
