import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../news/news.component.css']
})
export class UsersComponent implements OnInit {

  myModal = false;
  constructor() {
   }

  ngOnInit() {
  }

  mostrarModal(e) {
    this.myModal = e;
  }

  cerrarModal(e) {
    this.myModal = e;
  }
  
}
