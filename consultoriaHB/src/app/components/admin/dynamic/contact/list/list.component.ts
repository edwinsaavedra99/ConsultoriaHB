import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../../../../services/contact/contact.service';
import { Contact } from '../../../../../models/contact';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../services/notification/notification.service'
@Component({
  selector: 'app-list-Lawers',
  templateUrl: './list.component.html',
  styleUrls: ['../../users/list/list.component.css']
})
export class ListComponent implements OnInit {
  
  @Output() dataItemContact = new EventEmitter<boolean>();
  i = 1;
  listContact: Contact[] = [];
  list: Contact[]=[];//We are using this variable for showing data instead of calling FireBase database again
  itemContact : Contact = new Contact();
  items : Observable<any[]>;
  listHeaders: String[] = ["Nombre","Correo","Teléfono","Especialidad"];
  actualPage: number = 1;
  search_value:string;
  constructor(private contactService: ContactService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getContactList();    
    this.list=this.listContact;
  }

  successAlert(result){
    this.notificationService.sucess("Proceso Exitoso", "Body");
  }
  
  openFormEdit(data: Contact) {
    this.dataItemContact.emit(true);
    this.contactService.selectedContact = Object.assign({}, data);   
  }
 
  deleteContact(id:string) {
    if (confirm("¿Esta seguro de quere eliminar a este contacto?")){
      this.contactService.deleteContact(id)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Contacto eliminado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo eliminar el contacto.")
        }
      );
    }
    
  }

  getContactList() {
      this.contactService.getContactList().snapshotChanges().subscribe(res=>{
        this.listContact.length = 0;
        res.forEach( t=>{
          const contact = t.payload.toJSON();
          contact['$id'] = t.key;
          this.listContact.push(contact as Contact)
        })
      });
  }
  search(){
    this.list = this.listContact.filter(res=>{
      return res.nombre.toLowerCase().match(this.search_value.toLocaleLowerCase());
    });
  }

}
