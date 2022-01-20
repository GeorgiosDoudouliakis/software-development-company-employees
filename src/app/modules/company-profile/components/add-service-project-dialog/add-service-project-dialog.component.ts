import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-service-project-dialog',
  templateUrl: './add-service-project-dialog.component.html',
  styleUrls: ['./add-service-project-dialog.component.scss']
})
export class AddServiceProjectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddServiceProjectDialogComponent>) { }

  ngOnInit(): void {
  }

}
