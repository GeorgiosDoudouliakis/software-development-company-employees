import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Company } from '@shared/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyService {
  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore
  ) { }

  async addCompany(data: Company) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('companies').add({
      ...data,
      uid: user?.uid
    })
  }
}