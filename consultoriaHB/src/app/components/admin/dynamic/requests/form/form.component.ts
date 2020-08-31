import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { RequestsService} from '../../../../../services/requests/requests.service';
import { Request } from '../../../../../models/request'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../info/form/form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  dataForm: any;
  constructor(
    private formBuilder : FormBuilder,
    private requestsService: RequestsService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({      
      email : ['', {
        validators: [
          Validators.email,
          Validators.required
        ]
      }],
      message : ['',{
        validators:[
          Validators.required,
          Validators.minLength(5),
          //Validators.maxLength(500), no limite (o considerar por seguridad ?)
          //Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9., '-])*$") libertad para escribir
        ]
      }]
    });
  }
  email(){
    return this.dataForm.get('email');
  }
  message(){
    return this.dataForm.get('message')
  }

  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos');
    } else {
      if (this.getRequest().$id == undefined){
        console.log('El dato no fue cargado');
      } else {
        if(confirm('¿Esta seguro de querer enviar este correo?')){
          //enviar correo electronico
        }
      }
      this.closeModal()
    }
  }

  closeModal() {
    this.close.emit(false);
    this.requestsService.selectedRequest = new Request();
    this.refrescar();
  }

  refrescar(){
    this.dataForm.reset();
  }  

  getRequest(){
    return this.requestsService.selectedRequest;
  }
}
