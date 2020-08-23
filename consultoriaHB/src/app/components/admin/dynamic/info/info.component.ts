import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Info } from '../../../../models/info';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
 

  myModal = false;
  
  //itemInfo : Info = new Info();

  constructor() {}

  dataInfoTraslate(info:boolean){
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
