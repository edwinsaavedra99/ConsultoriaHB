import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { User } from '../../models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private dbPath = '/user';
  userRef: AngularFireList<User> = null;
  userSelected: User = new User();
  constructor(private db: AngularFireDatabase) {
  	this.userRef = db.list(this.dbPath);
  }

  getUserList(): AngularFireList<User> {
    this.userRef = this.db.list(this.dbPath) as AngularFireList<User>;
    return this.userRef;
  }

  addUser(user: User): any {
    return this.userRef.push(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.userRef.remove(id);
  }

  updateUser(id: string, user: User): Promise<void> {
    return this.userRef.update(id, user);
  }

  getUserbyEmail(email: string) {
    this.userRef = this.db.list(this.dbPath, 
    ref=> ref.orderByChild('email').equalTo(email)
  ) as AngularFireList<User>;
  return this.userRef;
}
}
