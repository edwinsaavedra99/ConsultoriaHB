import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-popup-areas',
  templateUrl: './popup-areas.component.html',
  styleUrls: ['./popup-areas.component.css']
})
export class PopupAreasComponent implements OnInit {
  @Input() area;
  @Output() apagar=new EventEmitter<boolean>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  apagarEmergente(){
    this.apagar.emit(false);
  }
}
