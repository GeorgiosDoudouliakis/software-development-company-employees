import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '@shared/models/company.model';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload-company-logo-dialog',
  templateUrl: './upload-company-logo-dialog.component.html',
  styleUrls: ['./upload-company-logo-dialog.component.scss']
})
export class UploadCompanyLogoDialogComponent implements OnInit {
  ref: AngularFireStorageReference; // Reference to storage bucket location
  task: AngularFireUploadTask;
  uploadProgress: Observable<any>;
  downloadUrl: string;
  company: Company;
  private destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialog: MatDialogRef<UploadCompanyLogoDialogComponent>, 
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  upload(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.snapshotChanges()
        .pipe(
          map((s: any) => (s.bytesTransferred / s.totalBytes)*100),
          takeUntil(this.destroy$)
        );
  }

  updateLogo() {
    if(this.ref) {
      this.ref.getDownloadURL().pipe(takeUntil(this.destroy$)).subscribe(url => {
        if(url) this.dialog.close({ url });
      })
    }
  }
}