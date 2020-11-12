import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Contact } from '../../../../../models/contact';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import { titleValidation } from 'src/app/validations/title-validation.directive';
import { ContactService } from '../../../../../services/contact/contact.service';
import { formatDate } from '@angular/common';
//import { NgModule } from '@angular/core';

import { NotificationService } from '../../../../../services/notification/notification.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../news/form/form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  contact : Contact = new Contact();

  constructor(
    private formBuilder : FormBuilder,
    private contactService: ContactService,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: any) {
      if (this.visible && changes.visible){
        if (changes.visible.currentValue == true ){
          this.contact = this.contactService.selectedContact;
          if(this.contact.nombre !=null){
            this.dataForm.patchValue({
              nombre: this.contact.nombre,
              email : this.contact.email,
              especialidad: this.contact.especialidad,
              telefono: this.contact.phone
            });
          }else{
            this.refrescar();
          }        
        }
      }
  }
  get nombre(){
    return this.dataForm.get('nombre');
  }
  get email(){
    return this.dataForm.get('email');
    
  }
  get especialidad(){
    return this.dataForm.get('especialidad');
    
  }
  get telefono(){
    return this.dataForm.get('telefono');
    
  }
  dataForm = this.formBuilder.group({
    nombre : ['',{
      validators:[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$")
      ]
    }],
    email : ['', {
      validators: [
        Validators.email,
        Validators.required
      ]
    }],
    especialidad : ['',{
      validators:[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^([a-zA-ZÀ-ÿ\u00f1\u00d1 ])*$")
      ]
    }],
    telefono : ['',{
      validators:[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^([0-9+ ])*$")
      ]
    }]
  });
  ngOnInit() {
    this.email.disable;
  }
  closeModal() {
    this.close.emit(false);
    this.refrescar();
  }
  addContact(data: Contact) {
    this.contactService
      .addContact(data)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Contacto registrado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo registrar el contacto.")
        }
      );
  }

  editContact($id: string, data:Contact){
    const aux = {
      nombre: data.nombre,
      email : data.email,
      especialidad : data.especialidad,
      phone : data.phone
    }
    this.contactService
    .updateContact($id, aux)
    .then(
      result =>{
        this.notificationService.sucess("Proceso Exitoso", "Contacto fue editado con exito.")
      }
    )
    .catch(
      err => {
        this.notificationService.error("Ocurrio un error", "No se pudo editar el contacto.")
      }
    );   
  }


  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.contact.nombre =this.nombre.value;
      this.contact.email = this.email.value;
      this.contact.especialidad = this.especialidad.value;
      this.contact.phone = this.telefono.value;
      if(this.contact.$id==null){
        this.addContact(this.contact);
      }else{      
        if(confirm('¿Esta seguro de querer guardar su edición?')){
          this.editContact(this.contact.$id,this.contact);
        }        
      }
    }    
    this.closeModal();
  }

  refrescar(){
    this.dataForm.patchValue({
      nombre: '',
      email: '',
      especialidad:'',
      telefono:''
    });
    this.contact = new Contact();
    this.contact.nombre ='';
    this.contact.email ='';
    this.contact.especialidad = '';
    this.contact.phone = '';
    this.contactService.selectedContact = new Contact();
  }
}
