import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InfoService } from '../../../../../services/info/info.service';
import { Info } from '../../../../../models/info';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../services/notification/notification.service'

@Component({
  selector: 'app-list-info',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponentInfo implements OnInit {

  @Output() dataItemInfo = new EventEmitter<boolean>();

  i = 1;
  listInfo: Info[] = [];
  list: Info[]=[];//We are using this variable for showing data instead of calling FireBase database again
  itemInfo : Info = new Info();
  items : Observable<any[]>;
  listHeaders: String[] = ["#Nro","Título","Fecha","Hora","Acciones"];
  actualPage: number = 1;
  title:String;

  constructor(private infoService: InfoService, private notificationService: NotificationService) {   }
 
  ngOnInit() {
    this.getInfoList();    
    this.list=this.listInfo;
  }

  successAlert(result){
    this.notificationService.sucess("Proceso Exitoso", "Body");
  }
  
  openFormEdit(data: Info) {
    this.dataItemInfo.emit(true);
    this.infoService.selectedInfo = Object.assign({}, data);   
  }
 
  deleteInfo(id:string) {
    if (confirm("¿Esta seguro de quere eliminar a este elemento?")){
      this.infoService.deleteInfo(id)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Elemento eliminado con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo eliminar el elemento.")
        }
      );
    }
    
  }

  getInfoList() {
      this.infoService.getInfoList().snapshotChanges().subscribe(res=>{
        this.listInfo.length = 0;
        res.forEach( t=>{
          const info = t.payload.toJSON();
          info['$id'] = t.key;
          this.listInfo.push(info as Info)
        })
      });
  }
   Search(){
    this.list = this.listInfo.filter(res=>{
      return res.titulo.toLowerCase().match(this.title.toLocaleLowerCase());
    });
  }
}