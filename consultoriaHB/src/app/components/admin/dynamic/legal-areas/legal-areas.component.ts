import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AreaLegal} from '../../../../models/areaLegal';

@Component({
  selector: 'app-legal-areas',
  templateUrl: './legal-areas.component.html',
  styleUrls: ['../news/news.component.css']
})
export class LegalAreasComponent implements OnInit {

  myModal = false;

  constructor() { }


  dataAreaTraslate(info:boolean){
    //this.itemInfo = info;
    this.mostrarModal();
  }

  mostrarModal() {
    this.myModal = true;
  }

  cerrarModal(e) {
    this.myModal = e;
  }
  ngOnInit() {
  }

}
