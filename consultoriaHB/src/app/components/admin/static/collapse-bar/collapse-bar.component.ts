import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-collapse-bar',
  templateUrl: './collapse-bar.component.html',
  styleUrls: ['./collapse-bar.component.scss']
})
export class CollapseBarComponent implements OnInit {
 @Input() visible: boolean;
 @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  closeMenu() {
    this.close.emit(false);
  }

  

}
