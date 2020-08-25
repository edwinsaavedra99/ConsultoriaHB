import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../info/info.component.css']
})
export class ContactComponent implements OnInit {

  
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
