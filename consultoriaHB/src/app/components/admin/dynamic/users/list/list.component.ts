import {  Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../../../services/users/users.service'
import { User } from '../../../../../models/user'
import { NotificationService } from '../../../../../services/notification/notification.service'

@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() openForm: EventEmitter<boolean> = new EventEmitter();
  listUser: User[] = [];
  list: User[]=[];
  listHeaders: String[] = ["Nombre Completo","Acciones"];
  actualPage: number = 1;
  search_value:string;
  user: User;

  constructor(private userService: UsersService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getUserList();
    this.list=this.listUser;
  }

  deleteUser(id:string) {
    if (confirm("¿Esta seguro de quere eliminar a este usuario?")){
      this.userService.deleteUser(id)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Usuario eliminado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo eliminar el usuario.")
        }
      );
    }
    
  }

  successAlert(result){
    this.notificationService.sucess("Proceso Exitoso", "Body");
  }




  getUserList() {
    this.userService.getUserList().snapshotChanges().subscribe(res =>{
      this.listUser.length = 0;
      res.forEach(t => {
        const user = t.payload.toJSON();
        user['$id'] = t.key;
        this.listUser.push(user as User)
      });
    });
  }

  search(){
    this.list = this.listUser.filter(res=>{
      return res.fullname.toLowerCase().match(this.search_value.toLocaleLowerCase());
    });
  }

  update(user: User){
    this.openForm.emit(true);
    this.userService.userSelected = Object.assign({}, user);
  }
}
