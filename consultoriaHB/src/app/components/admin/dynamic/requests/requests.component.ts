import { Component, OnInit } from '@angular/core';
import { Request,deviceRequest } from '../../../../models/request';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../info/info.component.css']
})
export class RequestsComponent implements OnInit {

  myModal: deviceRequest = new deviceRequest();
  //myModal = false;
  constructor() {
    this.myModal.event = false;
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
