import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCompanyLogoDialogComponent } from './upload-company-logo-dialog.component';

describe('UploadCompanyLogoDialogComponent', () => {
  let component: UploadCompanyLogoDialogComponent;
  let fixture: ComponentFixture<UploadCompanyLogoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCompanyLogoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCompanyLogoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
