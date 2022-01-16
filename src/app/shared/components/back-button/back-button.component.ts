import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-back-button',
  template: `
    <button mat-fab (click)="location.back()">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
  styles: [`
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 80px;
      left: 15px;
      width: 40px;
      height: 40px;
      background: #69F0AE;
    }
  `]
})
export class BackButtonComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit(): void {}

}
