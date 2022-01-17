import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@firebase/util';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  logout() {
    this.authService.logOut()
      .then(_ => this.authService.openSnackBar('You have successfully logged out!', 'success'))
      .catch((err: FirebaseError) => this.authService.openSnackBar(this.authService.authenticationError(err.message), 'error'));
  }
}
