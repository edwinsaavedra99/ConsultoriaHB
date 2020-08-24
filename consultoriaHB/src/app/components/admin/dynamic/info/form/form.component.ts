import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Info } from '../../../../../models/info';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import { titleValidation } from 'src/app/validations/title-validation.directive';
import { InfoService } from '../../../../../services/info/info.service';
import { formatDate } from '@angular/common';
//import { NgModule } from '@angular/core';

import { NotificationService } from '../../../../../services/notification/notification.service'
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

  constructor(
    private formBuilder : FormBuilder,
    private infoService: InfoService,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: any) {
    if (this.visible && changes.visible){
      if (changes.visible.currentValue == true ){
        this.info = this.infoService.selectedInfo;
        if(this.info.titulo !=null){
          this.dataForm.patchValue({
            titulo: this.info.titulo,
            contenido: this.info.contenido
          });
        }else{
          this.refrescar();
        }        
      }
    }
  }
  get titulo(){
    return this.dataForm.get('titulo');
  }
  get contenido(){
    return this.dataForm.get('contenido');
    
  }

  dataForm = this.formBuilder.group({
    titulo : ['',{
      validators:[
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
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Usuario registrado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo registrar el usuario.")
        }
      );
  }

  editInfo($id: string, data:Info){
    const aux = {
      titulo : data.titulo,
      contenido: data.contenido,
      fecha : data.fecha,
      hora : data.hora
    }
    this.infoService
    .updateInfo($id, aux)
    .then(
      result =>{
        this.notificationService.sucess("Proceso Exitoso", "Usuario fue editado con exito.")
      }
    )
    .catch(
      err => {
        this.notificationService.error("Ocurrio un error", "No se pudo editar el usuario.")
      }
    );   
  }


  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.info.contenido =this.contenido.value;
      this.info.titulo =this.titulo.value;
      this.info.fecha = formatDate(this.today,'dd/MM/yyyy','en-US');
      this.info.hora = formatDate(this.today,'hh:mm:ss','en-US');
      if(this.info.$id==null){
        this.addInfo(this.info);
      }else{      
        if(confirm('¿Esta seguro de querer guardar su edición?')){
          this.editInfo(this.info.$id,this.info);
        }        
      }
    }    
    this.closeModal();
  }

  refrescar(){
    this.dataForm.patchValue({
      titulo: '',
      contenido: ''
    });
    this.info = new Info();
    this.info.contenido ='';
    this.info.titulo ='';
    this.info.fecha = '';
    this.info.hora = '';
    this.infoService.selectedInfo = new Info();
  }
}