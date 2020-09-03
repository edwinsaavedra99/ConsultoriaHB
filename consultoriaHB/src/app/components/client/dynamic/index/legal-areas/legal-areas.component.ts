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
  listArea: AreaLegal[]=[];
  list: AreaLegal[];

      activar:boolean=false;
      constructor(private _config:NgbCarouselConfig,private areaService: LegalAreasService) {
        
      }
    
      ngOnInit(): void {
        this.getAreaList();
        this.list=this.listArea;
        this.list.length = 12;  
      }

      getAreaList() {
        this.areaService.getAreaList().snapshotChanges().subscribe(res=>{
          this.listArea.length = 0;
          res.forEach( t=>{
            const areaLegal = t.payload.toJSON();
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
      2200: {
        items: 6,
   
      },
      1780: {
        items: 5,

      },
      1300: {
        items: 4,
  
      },
      1150: {
        items: 3,
    
      },
      740: {
        items: 2,

      },
      620: {
        items: 1,
   
      },
      0: {
        items: 1
      }
  },
  nav: false
}

}
