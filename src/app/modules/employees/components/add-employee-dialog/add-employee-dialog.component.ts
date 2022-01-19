import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;
  availableSpecialities: string[] = [];
  availableProjects: string[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.availableSpecialities = this.employeesService.availableSpecialities;
    this.availableProjects = this.employeesService.availableProjects;
    this.initializeEmployeeForm();
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get contractType() {
    return this.employeeForm.get('contractType');
  }

  get speciality() {
    return this.employeeForm.get('speciality');
  }

  get technologies() {
    return this.employeeForm.get('technologies');
  }
  
  get empProjects() {
    return this.employeeForm.get('projects');
  }

  get techs() {
    const speciality = this.speciality?.value;

    if(speciality === 'Front End') {
      return ['Angular', 'React', 'Vue'];
    } else if(speciality === 'Back End') {
      return ['JavaScript', 'Python', 'PHP', 'Java', 'C Sharp', 'Go', 'MySQL', 'PostgreSQL', 'MongoDB'];
    } else {
      return ['Angular', 'React', 'Vue', 'JavaScript', 'Python', 'PHP', 'Java', 'C Sharp', 'Go', 'MySQL', 'PostgreSQL', 'MongoDB'];
    }
  }

  onAddEditEmployee() {
    this.dialogRef.close({
      firstName: this.capitalizeFirstLetter(this.firstName?.value),
      lastName: this.capitalizeFirstLetter(this.lastName?.value),
      contractType: this.contractType?.value,
      speciality: this.speciality?.value,
      technologies: this.technologies?.value,
      projects: this.empProjects?.value
    })
  }

  private initializeEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control(this.data.firstName || '', Validators.required),
      lastName: this.fb.control(this.data.lastName || '', Validators.required),
      contractType: this.fb.control(this.data.contractType || '', Validators.required),
      speciality: this.fb.control(this.data.speciality || '', Validators.required),
      technologies: this.fb.control(this.data.technologies || [], Validators.required),
      projects: this.fb.control(this.data.projects || [], Validators.required),
    })
  }

  private capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}