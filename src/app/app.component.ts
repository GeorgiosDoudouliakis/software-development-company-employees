import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'software-development-company-employees';

  constructor(private seoService: SeoService, public afAuth: AngularFireAuth) {
    this.seoService.generateTags([
      { name: 'keywords', content: 'Software Development Company Employees Management System' },
      { name: 'author', content: 'George Doudouliakis' }
    ])
  }
}