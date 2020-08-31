import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private dbPath = '/contact';

  contactRef: AngularFireList<Contact> = null;
  selectedContact: Contact = new Contact();

  constructor(private db: AngularFireDatabase) {
  	this.contactRef = db.list(this.dbPath);
  }

  addContact(contact: Contact): any {
    return this.contactRef.push(contact);
  }
 
  updateContact(id: string, value: any): Promise<void> {
    return this.contactRef.update(id, value);
  }
 
  deleteContact(id: string): Promise<void> {
    return this.contactRef.remove(id);
  }
 
  getContactList(): AngularFireList<Contact> {
    this.contactRef = this.db.list(this.dbPath) as AngularFireList<Contact>;
    return this.contactRef;
  }
}
