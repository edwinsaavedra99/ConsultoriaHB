import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../../../services/info/info.service';
import { Info } from '../../../../../models/info';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-info',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponentInfo implements OnInit {
  i = 1;
  listInfo: Info[] = [];
  itemInfo : Info = new Info();
  items : Observable<any[]>;
  listHeaders: String[] = ["id","titulo","fecha","hora","acciones"];
  actualPage: number = 1;

  constructor(private infoService: InfoService) {   }
 
  ngOnInit() {
    this.getInfoList();
  }

  updateInfo(id:string,data: Info) {
    /*this.infoService
      .updateInfo(id, data)
      .catch(err => console.log(err));
      
      */
  }
 
  deleteInfo(id:string) {
    console.log(id);
    this.infoService.deleteInfo(id).catch(
      err => console.log(err)
    );
  }

  getInfoList() {
      this.infoService.getInfoList().snapshotChanges().subscribe(res=>{
        this.listInfo.length = 0;
        res.forEach( t=>{
          const info = t.payload.toJSON();
          info['$id'] = t.key;
          console.log(info)
          this.listInfo.push(info as Info)

        })
      });
  }

}
