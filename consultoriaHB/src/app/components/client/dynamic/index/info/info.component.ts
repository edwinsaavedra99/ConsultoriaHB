import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InfoService } from '../../../../../services/info/info.service';
import { Info } from '../../../../../models/info';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../services/notification/notification.service'
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Output() dataItemInfo = new EventEmitter<boolean>();

  i = 1;
  listInfo: Info[] = [];
  list: Info[]=[];//We are using this variable for showing data instead of calling FireBase database again
  itemInfo : Info = new Info();
  items : Observable<any[]>;
  listHeaders: String[] = ["#Nro","Título","Fecha","Hora","Acciones"];
  actualPage: number = 1;
  title:String;
  contenido;

  constructor(private infoService: InfoService, private notificationService: NotificationService) {   }
 
  ngOnInit() {
    this.getInfoList();    
    this.list=this.listInfo;

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
 
}