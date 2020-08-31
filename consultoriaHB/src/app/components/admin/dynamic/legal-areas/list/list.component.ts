import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { LegalAreasService} from '../../../../../services/legal_areas/legal-areas.service';
import { AreaLegal} from '../../../../../models/areaLegal';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-list-areas',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() dataItemArea = new EventEmitter<boolean>();

  i = 1;
  listArea: AreaLegal[] = [];
  list: AreaLegal[]=[];//We are using this variable for showing data instead of calling FireBase database again
  itemArea : AreaLegal = new AreaLegal();
  items : Observable<any[]>;
  listHeaders: String[] = ["#Nro","Título","Fecha","Hora","Acciones"];
  actualPage: number = 1;
  title:String;
  constructor(private areaService: LegalAreasService, private storage:AngularFireStorage) { }

  ngOnInit() {
    this.getAreaList();
  //  this.listArea[0] = {$id:"a",titulo:"sda",contenido:"asd",fecha:"asd",hora:"asd"};
    this.list=this.listArea;
  }

  openFormEdit(data: AreaLegal) {
    this.dataItemArea.emit(true);
    this.areaService.selectedAreaLegal = Object.assign({}, data);   
  }
  deleteArea(id:string,imgUrl:string) {
    
    if (confirm("¿Esta seguro de quere eliminar a este elemento?")){
      this.deleteImgUrl(imgUrl);  
      this.areaService.deleteArea(id).catch(
        err => console.log(err)
      );
    }
   // this.areaService.deleteArea(id).catch(
   //   err => console.log(err)
   // );
  }

  getAreaList() {
    this.areaService.getAreaList().snapshotChanges().subscribe(res=>{
      this.listArea.length = 0;
      res.forEach( t=>{
        const areaLegal = t.payload.toJSON();
        areaLegal['$id'] = t.key;
        console.log(areaLegal)
        this.listArea.push(areaLegal as AreaLegal)

      })
    });
}
Search(){
  this.list = this.listArea.filter(res=>{
    return res.titulo.toLowerCase().match(this.title.toLocaleLowerCase());
  });
}
deleteImgUrl(downloadUrl:any){
  return this.storage.storage.refFromURL(downloadUrl).delete();
}
}
