import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedMethodsService } from '@shared/services/shared-methods.service';

@Component({
  selector: 'app-add-service-project-dialog',
  templateUrl: './add-service-project-dialog.component.html',
  styleUrls: ['./add-service-project-dialog.component.scss']
})
export class AddServiceProjectDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<AddServiceProjectDialogComponent>,
    public sharedMethodsService: SharedMethodsService
  ) { }

  ngOnInit(): void {}

  get type() {
    return this.sharedMethodsService.capitalizeFirstLetter(this.data.type);
  }
}
