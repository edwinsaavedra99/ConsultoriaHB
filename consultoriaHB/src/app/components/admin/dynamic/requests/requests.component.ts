import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../info/info.component.css']
})
export class RequestsComponent implements OnInit {

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
