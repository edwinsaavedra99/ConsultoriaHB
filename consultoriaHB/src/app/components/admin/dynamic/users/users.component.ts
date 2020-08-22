import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../info/info.component.css']
})
export class UsersComponent implements OnInit {

  myModal = false;
  constructor() {
   }

  ngOnInit() {
  }

  mostrarModal() {
    this.myModal = true;
  }

  cerrarModal(e) {
    this.myModal = e;
  }

}
