import { Component, CUSTOM_ELEMENTS_SCHEMA,OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {AreaLegal} from '../../../../../models/areaLegal'
import { LegalAreasService } from '../../../../../services/legal_areas/legal-areas.service';

@Component({
  selector: 'app-legal-areas',
  templateUrl: './legal-areas.component.html',
  styleUrls: ['./legal-areas.component.css']
})
export class LegalAreasComponent implements OnInit {

  @Input() area:any;
  listArea: AreaLegal[] = [];
  list: AreaLegal[]=[];

      activar:boolean=false;
      constructor(private _config:NgbCarouselConfig,private areaService: LegalAreasService) {
    
      }
      ngOnInit(): void {
        this.getAreaList();
        //  this.listArea[0] = {$id:"a",titulo:"sda",contenido:"asd",fecha:"asd",hora:"asd"};
         this.list=this.listArea;
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
        

    recibirData(dato){
      this.activar=true;
      this.area=dato;
      
    }
    apagarEmergente(apagar){
      this.activar=false;
    }
    customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['',''],
    responsive: {
    0: {
      items: 1
    },
    740: {
      items: 1
    },
    980: {
      items: 2
    },
    1150: {
      items: 3
    },
    1300: {
      items: 3
    },
    1880: {
      items: 5
    },
    2200: {
      items: 6
    }
  },
  nav: false
}

}
