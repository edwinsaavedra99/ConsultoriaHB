import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { User } from '../../models/user'
import { Session } from '../../models/session'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dbPath = '/user';
  private path = '/session'
  userRef: AngularFireList<User> = null;
  userSelected: User = new User();
  sessionRef: AngularFireList<Session> = null
  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
    this.sessionRef = db.list(this.path);
  }

  getUserbyEmail(email: string) {
    this.userRef = this.db.list(this.dbPath, 
      ref=> ref.orderByChild('email').equalTo(email)
    ) as AngularFireList<User>;
    return this.userRef;
  }

  addSession(user: User): any {
    const session: Session = new Session;
    session.user_key = user.$id;
    let date: Date  = new Date()
    session.date_created = date.getDate +"/" + (date.getMonth()+1) + "/" + date.getFullYear();
    session.time_created = date.getHours+":" + date.getMinutes() + ":" + date.getSeconds();
    return this.sessionRef.push(session);
  }
}