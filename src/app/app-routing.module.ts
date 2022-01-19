import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login' , 
    pathMatch: 'full' 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) 
  },
  { 
    path: 'employees', 
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule) 
  },
  { 
    path: 'company-profile', 
    loadChildren: () => import('./modules/company-profile/company-profile.module').then(m => m.CompanyProfileModule) 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
