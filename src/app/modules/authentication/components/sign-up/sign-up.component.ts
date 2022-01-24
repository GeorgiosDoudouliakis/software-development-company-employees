import { Component, OnInit } from '@angular/core';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.generateTags([{ name: 'description', content: 'Create an account' }], 'Sign Up');
  }

  ngOnInit(): void {}
}
