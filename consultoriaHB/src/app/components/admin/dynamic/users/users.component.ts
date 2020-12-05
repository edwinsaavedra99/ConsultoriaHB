import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../news/news.component.css']
})
export class UsersComponent implements OnInit {

  myModal = false;
  editar = false;
  constructor() {
   }

  ngOnInit() {
  }

  mostrarModal(e) {
    this.myModal = e;
  }

  mostrarModalEditar(e) {
    this.myModal = e;
    this.editar = true;
  }

  cerrarModal(e) {
    this.myModal = e;
    this.editar = false;
  }
  
}
