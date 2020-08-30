import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  @Input() area: any;
  @Output() salida=new EventEmitter<any>();
  
  activar:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  activarEmergente(){
    this.salida.emit(this.area);
    
  }


}
