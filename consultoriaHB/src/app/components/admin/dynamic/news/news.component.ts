import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['../info/info.component.css']
})
export class NewsComponent implements OnInit {

  myModal = false;
  constructor() { }
  dataNewTraslate(info:boolean){ this.mostrarModal(); }
  mostrarModal() { this.myModal = true; }
  cerrarModal(e) { this.myModal = e; }
  ngOnInit() { }

}
