import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/users/users.service'
import { User } from '../../../../../models/user'
@Component({
  selector: 'app-list-users',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listUser: User[] = [];
  list: User[]=[];
  listHeaders: String[] = ["Nombre Completo","Acciones"];
  actualPage: number = 1;
  search_value:string;

  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    this.getUserList();
    this.list=this.listUser;
  }

  deleteUser(id:string) {
    console.log(id);
    this.userService.deleteUser(id).catch(
      err => console.log(err)
    );
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
}
