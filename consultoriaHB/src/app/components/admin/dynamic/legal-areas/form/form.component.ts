import { Component, OnInit,  Input, Output, EventEmitter} from '@angular/core';
import { AreaLegal} from '../../../../../models/areaLegal';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import { titleValidation } from 'src/app/validations/title-validation.directive';
import { LegalAreasService } from '../../../../../services/legal_areas/legal-areas.service';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
//import { NgModule } from '@angular/core';
import { finalize} from "rxjs/operators"
import { async } from '@angular/core/testing';
import { observable, isObservable } from 'rxjs';

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
  imgSrc : string = '/assets/img/no_image.png';
  imgUrl : string = '';
  selectedImage: any = null;
  isLoading : boolean= false;



  constructor(private formBuilder : FormBuilder,private areaLegalService: LegalAreasService, private storage:AngularFireStorage) { }

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
      this.areaLegal.imagenUrl = 'naniiii';
      if(this.areaLegal.$id==null){
        this.isLoading = true; 
        var filePath = `areasLegales/${this.selectedImage.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
          finalize(()=>{ 
            fileRef.getDownloadURL().subscribe((url)=> {
             this.areaLegal.imagenUrl = url;
             this.imgUrl  = url;
             console.log('first is -----------> '+this.areaLegal.imagenUrl);
             console.log('second is -----------> '+this.imgUrl); 
             this.addAreaLegal(this.areaLegal);
             this.isLoading = false;
             this.closeModal();
            })
          })
        ).subscribe();
      }else{      
        if(confirm('¿Esta seguro de querer guardar su edición?')){
          this.editAreaLegal(this.areaLegal.$id,this.areaLegal);
          this.closeModal();
        }        
      }
    }    
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
    this.imgSrc = '/assets/img/no_image.png';
    this.selectedImage = null;

    this.areaLegalService.selectedAreaLegal = new AreaLegal();
  }

  showPreview(event:any){
    
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      
    }
    else{
      this.imgSrc = '/assets/img/no_image.png';
      this.selectedImage = null;
    }
  }


}
