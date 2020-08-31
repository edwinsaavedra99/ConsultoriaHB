import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Request } from '../../models/request'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private dbPath = '/request';

  requestRef: AngularFireList<Request> = null;
  selectedRequest: Request = new Request();

  constructor(private db: AngularFireDatabase) {
  	this.requestRef = db.list(this.dbPath);
  }

  addRequest(request: Request): any {
    //sendEmailRequest(request);
    return this.requestRef.push(request);
  }
 
 /* updateRequest(id: string, value: any): Promise<void> {
    return this.requestRef.update(id, value);
  }*/

  /* sendEmailRequest(request: Request): Promise<void> {
    return functions.firebase.tools;
  }*/
 
  deleteRequest(id: string): Promise<void> {
    return this.requestRef.remove(id);
  }
 
  getRequestList(): AngularFireList<Request> {
    this.requestRef = this.db.list(this.dbPath) as AngularFireList<Request>;
    return this.requestRef;
  }
}
