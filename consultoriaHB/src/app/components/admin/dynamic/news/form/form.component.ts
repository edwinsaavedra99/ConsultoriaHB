import { Component, OnInit,  Input, Output, EventEmitter} from '@angular/core';
import { New} from '../../../../../models/new';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { NewsService } from '../../../../../services/news/news.service';
import { formatDate } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from "rxjs/operators"
import { async } from '@angular/core/testing';
import { observable, isObservable } from 'rxjs';
import * as firebase from 'firebase';
import { NotificationService } from '../../../../../services/notification/notification.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  newData : New = new New();
  today = new Date();
  tsToday = '';
  imgSrc : string = '/assets/img/no_image.png'; // defecto
  imgUrl : string = this.imgSrc;
  selectedImage: any = null;
  isLoading : boolean= false;
  toEraseImgUrl: string =  '';



  constructor(private formBuilder : FormBuilder,private newDataService: NewsService, 
    private storage:AngularFireStorage,
    private notificationService: NotificationService) { }

  ngOnChanges(changes: any) {
    if (this.visible && changes.visible){
      if (changes.visible.currentValue == true ){
        this.newData = this.newDataService.selectedNew;
        if(this.newData.titulo !=null){
          this.dataForm.patchValue({
            titulo: this.newData.titulo,
            contenido: this.newData.contenido,
            imgUrl: this.newData.imagenUrl,
            
          });
          this.imgUrl = this.newData.imagenUrl;
          this.toEraseImgUrl = this.newData.imagenUrl
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
        Validators.maxLength(5000),
        Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9:()., '-])*$")
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

  addnewData(data: New) {
    this.newDataService
      .addNew(data)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Noticia registrada con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo registrar la noticia.")
        }
      );
  }

  editnewData($id: string, data:New){
    const aux = {
      titulo : data.titulo,
      contenido: data.contenido,
      fecha : data.fecha,
      hora : data.hora,
      imagenUrl : data.imagenUrl
    }
    this.newDataService
    .updateNew($id, aux)
    .then(
      result =>{
        this.notificationService.sucess("Proceso Exitoso", "Noticia fue editada con exito.")
      }
    )
    .catch(
      err => {
        this.notificationService.error("Ocurrio un error", "No se pudo editar la noticia.")
      }
    );      
  }

  cargarImagen(mode:boolean){
    this.isLoading = true; 
    var filePath = `news/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{ 
        fileRef.getDownloadURL().subscribe((url)=> {
         this.newData.imagenUrl = url;
         if(mode){
          this.addnewData(this.newData);
         }else{
          this.editnewData(this.newData.$id,this.newData);
         }         
         this.isLoading = false;
         this.closeModal();
        })
      })
    ).subscribe();
  }

  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos')
      return;
    }else{
      this.newData.contenido =this.contenido.value;
      this.newData.titulo =this.titulo.value;
      this.today = new Date();
      this.newData.fecha = formatDate(this.today,'dd/MM/yyyy','en-US');
      this.newData.hora = formatDate(this.today,'hh:mm:ss','en-US');
      //this.newData.imagenUrl = 'algo salió mal';
      if(this.newData.$id==null){
        this.cargarImagen(true);
      }else{     
        if(confirm('¿Esta seguro de querer guardar su edición?')){
          if(this.selectedImage==null){
            this.isLoading = true;
            this.editnewData(this.newData.$id,this.newData);
            this.isLoading = false; 
            this.closeModal();
          }else{
            this.cargarImagen(false);
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
    this.newData = new New();
    this.newData.contenido ='';
    this.newData.titulo ='';
    this.newData.fecha = '';
    this.newData.hora = '';
    this.imgUrl = this.imgSrc;

    this.selectedImage = null;

    this.newDataService.selectedNew = new New();
  }

  showPreview(event:any){
    
    if(event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      let file = event.target.files[0]; 
      this.dataForm.controls['imgUrl'].setValue(file ? file.name : '');
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
