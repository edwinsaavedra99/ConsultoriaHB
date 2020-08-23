import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AreaLegal} from '../../models/areaLegal'

@Injectable({
  providedIn: 'root'
})
export class LegalAreasService {
  private dbPath = '/legal-areas';
  areaRef: AngularFireList<AreaLegal> = null;
  constructor(private db: AngularFireDatabase) { 
    this.areaRef = db.list(this.dbPath);
  }

  addArea(area:AreaLegal):any{
    return this.areaRef.push(area);
  }
  updateArea(id: string,value: any): Promise<void>{
    return this.areaRef.update(id,value);
  }
  deleteArea(id: string): Promise<void>{
    return this.areaRef.remove(id);
  }
  getAreaList(): AngularFireList<AreaLegal>{
    this.areaRef = this.db.list(this.dbPath) as AngularFireList<AreaLegal>;
    return this.areaRef;
  }

}
