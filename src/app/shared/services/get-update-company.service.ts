import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Company } from '@shared/models/company.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUpdateCompanyService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  get company() {
    return this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if(user) {
          return this.db.collection<Company[]>('companies', (ref: any) => ref.where('uid', '==', user.uid))
                        .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    )
  }

  updateCompany(companyId: string, company: Company) {
    return this.db.collection('companies').doc(companyId).update({ ...company });
  }
}
