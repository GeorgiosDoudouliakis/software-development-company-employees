import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }

  generateTags(tags: { name: string, content: string }[], title?: string) {
    for(let tag of tags) {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    }

    if(title) {
      this.title.setTitle(`Software Development Company Employees | ${title}`);
    }
  }
}