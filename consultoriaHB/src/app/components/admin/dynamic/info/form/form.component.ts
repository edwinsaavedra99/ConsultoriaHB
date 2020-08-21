import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.close.emit(false);
  }

}