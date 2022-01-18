import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;
  addOnBlur = true;
  projects: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Employee, 
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeEmployeeForm();
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get age() {
    return this.employeeForm.get('age');
  }

  get contractType() {
    return this.employeeForm.get('contractType');
  }

  get speciality() {
    return this.employeeForm.get('speciality');
  }
  
  get hireDate() {
    return this.employeeForm.get('hireDate');
  }

  get empProjects() {
    return this.employeeForm.get('projects');
  }

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
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      age: this.age?.value,
      contractType: this.contractType?.value,
      speciality: this.speciality?.value,
      hireDate: this.hireDate?.value,
      projects: this.empProjects?.value
    })
  }

  private initializeEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      age: this.fb.control('', Validators.required),
      contractType: this.fb.control('', Validators.required),
      speciality: this.fb.control('', Validators.required),
      hireDate: this.fb.control('', Validators.required),
      projects: this.fb.control([], Validators.required),
    })
  }
}
