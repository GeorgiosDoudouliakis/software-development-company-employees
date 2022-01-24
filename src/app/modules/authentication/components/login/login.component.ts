import { Component, OnInit } from '@angular/core';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.generateTags([{ name: 'description' , content: 'Log in to your account' }], 'Log In');
  }

  ngOnInit(): void {}
}
