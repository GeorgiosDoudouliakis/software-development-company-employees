import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceProjectDialogComponent } from './add-service-project-dialog.component';

describe('AddServiceProjectDialogComponent', () => {
  let component: AddServiceProjectDialogComponent;
  let fixture: ComponentFixture<AddServiceProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
