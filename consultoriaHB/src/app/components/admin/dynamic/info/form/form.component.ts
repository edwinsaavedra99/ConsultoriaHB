import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { titleValidation } from 'src/app/validations/title-validation.directive';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder : FormBuilder) { }

  get titulo(){
    return this.dataForm.get('titulo');
  }
  get contenido(){
    return this.dataForm.get('contenido');
  }

  dataForm = this.formBuilder.group({
    titulo : ['',{
      validators:[
        titleValidation]
    }],
    contenido : ['',{
      validators:[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
        Validators.pattern('^[a-zA-Z0-9]*$')]
    }]
  });

  ngOnInit() {
  }

  closeModal() {
    this.close.emit(false);
    this.refrescar();
  }

  submit(){

    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }

    console.log(this.dataForm.value);
    this.refrescar();
  }

  refrescar(){
    this.dataForm.patchValue({
      titulo: '',
      contenido: ''
    });
  }

}