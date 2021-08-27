import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.component.html',
  styleUrls: ['./contac.component.css']
})
export class ContacComponent implements OnInit {
  
  dataForm: any;
  email_value:string;
  number_value:string;
  name_value:string;
  surname_value:string;
  description_value:string;
  activar: boolean = false;

  constructor(
    private formBuilder : FormBuilder
    )
  { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      email : ['', {
        validators: [
          Validators.email,
          Validators.required
        ]
      }],
      number :[''],
      name : ['', {
        validators: [
          Validators.required
        ]
      }],
      surname : ['', {
        validators: [
          Validators.required
        ]
      }],
      description : ['', {
        validators: [
          Validators.required
        ]
      }],
    });
  }

  email(){
    return this.dataForm.get('email');
  }
  number(){
    return this.dataForm.get('number')
  }
  name(){
    return this.dataForm.get('name')
  }
  surname(){
    return this.dataForm.get('surname')
  }
  description(){
    return this.dataForm.get('description')
  }


  activarEmergente() {
    this.activar = true;
  }
  apagarEmergente() {
    this.activar = false;
  }
  submit(){}
}
