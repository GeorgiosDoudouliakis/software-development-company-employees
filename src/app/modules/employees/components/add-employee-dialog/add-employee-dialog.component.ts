import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  addOnBlur = true;
  projects: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee, 
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.projects.push(value);
    }

    event.chipInput!.clear();
  }

  remove(project: string): void {
    const index = this.projects.indexOf(project);

    if (index >= 0) {
      this.projects.splice(index, 1);
    }
  }

  onAddEmployee() {
    this.dialogRef.close({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      age: this.data.age,
      contractType: this.data.contractType,
      speciality: this.data.speciality,
      hireDate: this.data.hireDate,
      projects: this.projects
    })
  }
}
