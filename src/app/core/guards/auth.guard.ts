import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((res: any) => {
        if(!res) {
          this.router.navigate(['/auth/login']);
          this.authService.openSnackBar('You have no permission to access this link. Please log in!', 'info');
          return false;
        }
        return true;
      })
    )
  }
}