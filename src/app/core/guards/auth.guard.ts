import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const isLoggedin = !!user;

    if(!isLoggedin) {
      this.router.navigate(['/auth/login']);
      this.authService.openSnackBar('You have no permission to access this link. Please log in!', 'error');
    } 
    
    return isLoggedin;
  }
}