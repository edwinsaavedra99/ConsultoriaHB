import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {New} from '../../models/new'
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private dbPath = '/news';

  newRef: AngularFireList<New> = null;
  selectedNew: New = new New();
  
  constructor(private db: AngularFireDatabase) { 
    this.newRef = db.list(this.dbPath);
  }
  addNew(newData:New):any{
    return this.newRef.push(newData);
  }
  updateNew(id: string,value: any): Promise<void>{
    return this.newRef.update(id,value);
  }
  deleteNew(id: string): Promise<void>{
    return this.newRef.remove(id);
  }
  getNewList(): AngularFireList<New>{
    this.newRef = this.db.list(this.dbPath) as AngularFireList<New>;
    return this.newRef;
  }
}
