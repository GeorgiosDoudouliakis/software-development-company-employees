import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  logout() {
    this.authService.logOut()
      .then(_ => {
        this.authService.openSnackBar('You have successfully logged out!', 'success');
        this.router.navigate(['/auth/login']);
      })
      .catch((err: FirebaseError) => this.authService.openSnackBar(this.authService.authenticationError(err.message), 'error'));
  }
}