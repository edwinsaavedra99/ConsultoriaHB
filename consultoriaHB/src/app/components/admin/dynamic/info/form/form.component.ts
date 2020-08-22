import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Info } from '../../../../../models/info';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { titleValidation } from 'src/app/validations/title-validation.directive';
import { InfoService } from '../../../../../services/info/info.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  info : Info = new Info();
  today = new Date();
  tsToday = '';

  constructor(private formBuilder : FormBuilder,private infoService: InfoService) { }

  get titulo(){
    return this.dataForm.get('titulo');
  }
  get contenido(){
    return this.dataForm.get('contenido');
  }

  dataForm = this.formBuilder.group({
    titulo : ['',{
      validators:[
        //titleValidation
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d10-9 ]*$")
      ]
    }],
    contenido : ['',{
      validators:[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
        Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9., '-])*$")
      ]
    }]
  });

  ngOnInit() {
  }

  closeModal() {
    this.close.emit(false);
    this.refrescar();
  }

  addInfo(data: Info) {
    this.infoService
      .addInfo(data)
      .catch(err => {
        console.log(err);
        alert('Error')
      });
  }

  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{      
      //consulta
      this.info.contenido =this.contenido.value;
      this.info.titulo =this.titulo.value;
      this.info.fecha = formatDate(this.today,'dd/MM/yyyy','en-US');
      this.info.hora = formatDate(this.today,'hh:mm:ss','en-US');
      this.addInfo(this.info);
    }    
    this.closeModal();
  }

  refrescar(){
    this.dataForm.patchValue({
      titulo: '',
      contenido: ''
    });
  }

}