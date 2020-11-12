import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../../models/company';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import { titleValidation } from 'src/app/validations/title-validation.directive';
import { CompanyService } from '../../../../../services/company/company.service';
//import { formatDate } from '@angular/common';
//import { NgModule } from '@angular/core';
import { NotificationService } from '../../../../../services/notification/notification.service'


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../../news/form/form.component.scss']
})
export class CompanyComponent implements OnInit {

  company : Company = new Company();
  dataForm: any;
  constructor( private formBuilder : FormBuilder,
    private companyService: CompanyService,
    private notificationService: NotificationService) { 
      this.companyService.getCompanyItem().valueChanges().subscribe( res=>{
        this.company = res
        this.dataForm.patchValue({
          direccion:  this.company.address,
          email:  this.company.email,
          telefono: this.company.phone,
          fbLink: this.company.fbLink,
          twLink:  this.company.twLink 
        });
      });
      

  }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      direccion : ['',{
        validators:[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300),
          Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9., '-])*$")
        ]
      }],
      email : ['', {
        validators: [
          Validators.email,
          Validators.required
        ]
      }],
      telefono:['', {
        validators: [
          Validators.pattern("^([0-9.+ -])*$"),
          Validators.minLength(4),
          Validators.required
        ]
      }],
      fbLink:[''/*, {
        validators: [
          Validators.required
        ]
      }*/],
      twLink:[''/*, {
        validators: [
          Validators.required
        ]
      }*/]
    });
  }
  get direccion(){
    return this.dataForm.get('direccion');
  }
  get email(){
    return this.dataForm.get('email');
    
  }
  get telefono(){
    return this.dataForm.get('telefono');    
  }
  get fbLink(){
    return this.dataForm.get('fbLink');    
  }
  get twLink(){
    return this.dataForm.get('twLink');    
  }

  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.company.address =this.direccion.value;
      this.company.email =this.email.value;
      this.company.phone = this.telefono.value;
      this.company.fbLink = this.fbLink.value;
      this.company.twLink = this.twLink.value;
      if(confirm('¿Esta seguro de querer guardar su edición?')){
        this.editCompany(this.company);
      } 
    }    
  }

  editCompany(data:Company){
    this.companyService
    .updateCompany(data)
    .then(
      result =>{
        this.notificationService.sucess("Proceso Exitoso", "Elemento fue editado con exito.")
      }
    )
    .catch(
      err => {
        this.notificationService.error("Ocurrio un error", "No se pudo editar el elemento.")
      }
    );   
  }

}
