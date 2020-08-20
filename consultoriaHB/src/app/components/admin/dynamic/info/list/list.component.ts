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

  listInfo: Info[] = [];
  items : Observable<any[]>;
 
  constructor(private infoService: InfoService,public db:AngularFireDatabase) { 
    //this.items = db.list('info').valueChanges();
  }
 
  ngOnInit() {
    this.getInfoList();
  }

  updateInfo(id:string,data: Info) {
    this.infoService
      .updateInfo(id, data)
      .catch(err => console.log(err));
  }
 
  deleteInfo(id:string) {
      this.infoService
      .deleteInfo(id)
      .catch(err => console.log(err));
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
