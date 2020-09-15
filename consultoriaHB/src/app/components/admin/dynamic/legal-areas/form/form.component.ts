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
import * as firebase from 'firebase';
import { NotificationService } from '../../../../../services/notification/notification.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../info/form/form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  areaLegal : AreaLegal = new AreaLegal();
  today = new Date();
  tsToday = '';
  imgSrc : string = '/assets/img/no_image.png'; // defecto
  imgUrl : string = this.imgSrc;
  selectedImage: any = null;
  isLoading : boolean= false;
  toEraseImgUrl: string =  '';
  NoImage :boolean = false;


  constructor(private formBuilder : FormBuilder,private areaLegalService: LegalAreasService, private storage:AngularFireStorage,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: any) {
    if (this.visible && changes.visible){
      if (changes.visible.currentValue == true ){
        this.areaLegal = this.areaLegalService.selectedAreaLegal;
        if(this.areaLegal.titulo !=null){
          this.dataForm.patchValue({
            titulo: this.areaLegal.titulo,
            contenido: this.areaLegal.contenido,
            imgUrl: this.areaLegal.imagenUrl,
            
          });
          this.imgUrl = this.areaLegal.imagenUrl;
          this.toEraseImgUrl = this.areaLegal.imagenUrl;
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
  get imagenUrl(){
    return this.dataForm.get('imgUrl');
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
    }],
    imgUrl : ['',{
      validators:[
        Validators.required
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
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Elemento registrado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo registrar el elemento.")
        }
      );
  }
 
  editAreaLegal($id: string, data:AreaLegal){
    const aux = {
      titulo : data.titulo,
      contenido: data.contenido,
      fecha : data.fecha,
      hora : data.hora,
      imagenUrl : data.imagenUrl
    }
    this.areaLegalService
    .updateArea($id, aux)
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


  submit(){
              
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.areaLegal.contenido =this.contenido.value;
      this.areaLegal.titulo =this.titulo.value;
      this.today = new Date();
      this.areaLegal.fecha = formatDate(this.today,'dd/MM/yyyy','en-US');
      this.areaLegal.hora = formatDate(this.today,'hh:mm:ss','en-US');
      this.areaLegal.imagenUrl = 'algo salió mal';
      if(this.areaLegal.$id==null){
        if(this.imgUrl === this.imgSrc){
          alert('Ingrese una imagen')
        }
        else{
          this.isLoading = true; 
          var filePath = `areasLegales/${this.selectedImage.name}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
            finalize(()=>{ 
              fileRef.getDownloadURL().subscribe((url)=> {
               this.areaLegal.imagenUrl = url;
               this.addAreaLegal(this.areaLegal);
               this.isLoading = false;
               this.closeModal();
              })
            })
          ).subscribe();
        }
      }else{     
        if(confirm('¿Esta seguro de querer guardar su edición?')){

          this.isLoading = true;
          if( this.toEraseImgUrl === this.imgUrl){
            this.areaLegal.imagenUrl = this.imgUrl;
            this.editAreaLegal(this.areaLegal.$id,this.areaLegal);
            this.isLoading = false;
            this.closeModal();
          }
          else{
            var filePath = `areasLegales/${this.selectedImage.name}_${new Date().getTime()}`;
            const fileRef = this.storage.ref(filePath);
  
            this.deleteImgUrl(this.toEraseImgUrl);
            this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
            finalize(()=>{ 
              fileRef.getDownloadURL().subscribe((url)=> {
               this.areaLegal.imagenUrl = url;
               this.editAreaLegal(this.areaLegal.$id,this.areaLegal);
               this.isLoading = false;    
               this.closeModal();
              })
            })
          ).subscribe();
          }
        }         
      }
    }    
  }

  refrescar(){
    this.dataForm.patchValue({
      titulo: '',
      contenido: '',
      imagenUrl: '',
      imgUrl : this.imgSrc
    });
    this.areaLegal = new AreaLegal();
    this.areaLegal.contenido ='';
    this.areaLegal.titulo ='';
    this.areaLegal.fecha = '';
    this.areaLegal.hora = '';
    this.imgUrl = this.imgSrc;

    this.selectedImage = null;

    this.areaLegalService.selectedAreaLegal = new AreaLegal();
  }

  showPreview(event:any){
    
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      
    }
    else{
      this.imgUrl = this.imgSrc;
      this.selectedImage = null;
    }
  }

  deleteImgUrl(downloadUrl:any){
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }


}
