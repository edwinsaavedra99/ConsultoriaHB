import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Info } from '../../models/info'


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private dbPath = '/info';
  infoRef: AngularFireList<Info> = null;
  constructor(private db: AngularFireDatabase) {
  	this.infoRef = db.list(this.dbPath);
  }

  addInfo(info: Info): any {
    return this.infoRef.push(info);
  }
 
  updateInfo(id: string, value: any): Promise<void> {
    return this.infoRef.update(id, value);
  }
 
  deleteInfo(id: string): Promise<void> {
    return this.infoRef.remove(id);
  }
 
  getInfoList(): AngularFireList<Info> {
    this.infoRef = this.db.list(this.dbPath) as AngularFireList<Info>;
    return this.infoRef;
  }
}
