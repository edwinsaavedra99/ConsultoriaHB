import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { NewsService} from '../../../../../services/news/news.service';
import { New } from '../../../../../models/new';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotificationService } from '../../../../../services/notification/notification.service'
@Component({
  selector: 'app-list-news',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output() dataItemNew = new EventEmitter<boolean>();
  i = 1;
  listNew: New[] = [];
  list: New[]=[];//We are using this variable for showing data instead of calling FireBase database again
  itemNew : New = new New();
  items : Observable<any[]>;
  listHeaders: String[] = ["#Nro","Título","Fecha","Hora","Acciones"];
  actualPage: number = 1;
  title:String;
  constructor(private newService: NewsService, private storage:AngularFireStorage, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAreaList();
  //  this.listArea[0] = {$id:"a",titulo:"sda",contenido:"asd",fecha:"asd",hora:"asd"};
    this.list=this.listNew;
  }
  successAlert(result){
    this.notificationService.sucess("Proceso Exitoso", "Body");
  }
  openFormEdit(data: New) {
    this.dataItemNew.emit(true);
    this.newService.selectedNew = Object.assign({}, data);   
  }
  deletenewData(id:string,imgUrl:string) {
    if (confirm("¿Esta seguro de quere eliminar a este elemento?")){
      this.deleteImgUrl(imgUrl);
      this.newService.deleteNew(id).then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Noticia eliminada con exito.")
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo eliminar la noticia.")
        }
      );
    }
  }

  getAreaList() {
    this.newService.getNewList().snapshotChanges().subscribe(res=>{
      this.listNew.length = 0;
      res.forEach( t=>{
        const new1 = t.payload.toJSON();
        new1['$id'] = t.key;
        console.log(new1)
        this.listNew.push(new1 as New)

      })
    });
  }
  Search(){
    this.list = this.listNew.filter(res=>{
      return res.titulo.toLowerCase().match(this.title.toLocaleLowerCase());
    });
  }
  deleteImgUrl(downloadUrl:any){
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
