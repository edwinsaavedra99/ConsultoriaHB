import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Company } from '../../models/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private dbPath = '/company';

  companyRef: AngularFireList<Company> = null;
  companyObject : AngularFireObject<Company>;
  selectedCompany: Company = new Company();

  constructor(private db: AngularFireDatabase) {
    this.companyRef = db.list(this.dbPath);
    this.companyObject = db.object(this.dbPath);
  }

  updateCompany(value: Company): Promise<void> {
    return this.companyObject.update(value);
  }

  getCompanyItem(): any {
    return this.companyObject;
  }
}
