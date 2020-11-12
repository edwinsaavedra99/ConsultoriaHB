import { Component, OnInit } from '@angular/core';
import { Request,deviceRequest } from '../../../../models/request';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['../news/news.component.css']
})
export class RequestsComponent implements OnInit {

  myModal: deviceRequest = new deviceRequest();
  myModal1 = true;
  constructor() {
    this.myModal.event = false;
  }

  ngOnInit() {
  }

  mostrarModal(e) {
    this.myModal = e;
    this.myModal1 = false;
  }

  cerrarModal(e) {
    this.myModal = e;
    this.myModal1 = true;
  }
}
