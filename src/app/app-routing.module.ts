import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login' , 
    pathMatch: 'full' 
  },
  { 
    path: 'auth', 
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) 
  },
  { 
    path: 'employees', 
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule) 
  },
  { 
    path: 'company-profile', 
    canActivate: [AuthGuard],
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
