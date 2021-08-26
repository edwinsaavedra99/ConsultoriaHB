import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AreaLegal } from 'src/app/models/areaLegal';


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  @Input() area:AreaLegal;
  @Output() salida=new EventEmitter<AreaLegal>();
  titulo:String;
  contenido:String;
  imagen:String;
  activar:boolean=false;

  constructor() {}

  ngOnInit(): void {
    if(this.area != null){
      this.titulo=this.area.titulo;
      this.contenido=this.area.contenido;
      this.imagen=this.area.imagenUrl;
    }
  }
  activarEmergente(){
    this.salida.emit(this.area);
  }
}
