import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AreaLegal } from '../../../../../models/areaLegal'
import { LegalAreasService } from '../../../../../services/legal_areas/legal-areas.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-legal-areas',
  templateUrl: './legal-areas.component.html',
  styleUrls: ['./legal-areas.component.css']
})
export class LegalAreasComponent implements OnInit {

  @Input() area: AreaLegal;
  listArea: AreaLegal[] = [];
  list: AreaLegal[];

  activar: boolean = false;
  constructor(private _config: NgbCarouselConfig,
    private areaService: LegalAreasService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAreaList();
    this.list = this.listArea;
    this.list.length = 12;
  }

  getAreaList() {
    this.areaService.getAreaList().snapshotChanges().subscribe(res => {
      this.listArea.length = 0;
      res.forEach(t => {
        const areaLegal = t.payload.toJSON();
        this.listArea.push(areaLegal as AreaLegal)

      })
    });
  }


  recibirData(dato) {
    //this.activar=true;
    //this.area=dato;

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
  apagarEmergente(apagar) {
    this.activar = false;
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
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
