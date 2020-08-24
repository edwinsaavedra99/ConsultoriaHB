import { Component, OnInit,  Input, Output, EventEmitter} from '@angular/core';
import { AreaLegal} from '../../../../../models/areaLegal';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import { titleValidation } from 'src/app/validations/title-validation.directive';
import { LegalAreasService } from '../../../../../services/legal_areas/legal-areas.service';
import { formatDate } from '@angular/common';
//import { NgModule } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  areaLegal : AreaLegal = new AreaLegal();
  today = new Date();
  tsToday = '';

  constructor(private formBuilder : FormBuilder,private areaLegalService: LegalAreasService) { }

  ngOnChanges(changes: any) {
    if (this.visible && changes.visible){
      if (changes.visible.currentValue == true ){
        this.areaLegal = this.areaLegalService.selectedAreaLegal;
        if(this.areaLegal.titulo !=null){
          this.dataForm.patchValue({
            titulo: this.areaLegal.titulo,
            contenido: this.areaLegal.contenido
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

  addAreaLegal(data: AreaLegal) {
    this.areaLegalService
      .addArea(data)
      .catch(err => {
        console.log(err);
        alert('Error')
      });
  }

  editAreaLegal($id: string, data:AreaLegal){
    const aux = {
      titulo : data.titulo,
      contenido: data.contenido,
      fecha : data.fecha,
      hora : data.hora
    }
    this.areaLegalService
    .updateArea($id, aux)
    .then(function (result){
      console.log(result);
      
    }).catch(function(error){
      console.log(error);
    });     
  }


  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.areaLegal.contenido =this.contenido.value;
      this.areaLegal.titulo =this.titulo.value;
      this.areaLegal.fecha = formatDate(this.today,'dd/MM/yyyy','en-US');
      this.areaLegal.hora = formatDate(this.today,'hh:mm:ss','en-US');
      if(this.areaLegal.$id==null){
        this.addAreaLegal(this.areaLegal);
      }else{      
        if(confirm('¿Esta seguro de querer guardar su edición?')){
          this.editAreaLegal(this.areaLegal.$id,this.areaLegal);
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
    this.areaLegal = new AreaLegal();
    this.areaLegal.contenido ='';
    this.areaLegal.titulo ='';
    this.areaLegal.fecha = '';
    this.areaLegal.hora = '';
    this.areaLegalService.selectedAreaLegal = new AreaLegal();
  }

}
