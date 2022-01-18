import { Component, Inject, OnInit } from '@angular/core';
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
  availableProjects: string[] = ['Tomi Systems', 'Pure Profile', 'VMWare'];

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
  
  get empProjects() {
    return this.employeeForm.get('projects');
  }

  onAddEmployee() {
    this.dialogRef.close({
      firstName: this.capitalizeFirstLetter(this.firstName?.value),
      lastName: this.capitalizeFirstLetter(this.lastName?.value),
      age: this.age?.value,
      contractType: this.contractType?.value,
      speciality: this.speciality?.value,
      projects: this.empProjects?.value
    })
  }

  private initializeEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control(this.data.firstName || '', Validators.required),
      lastName: this.fb.control(this.data.lastName || '', Validators.required),
      age: this.fb.control(this.data.age || '', Validators.required),
      contractType: this.fb.control(this.data.contractType || '', Validators.required),
      speciality: this.fb.control(this.data.speciality || '', Validators.required),
      projects: this.fb.control(this.data.projects || [], Validators.required),
    })
  }

  private capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}