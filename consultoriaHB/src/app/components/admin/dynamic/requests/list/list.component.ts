import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestsService } from '../../../../../services/requests/requests.service';
import { Request,deviceRequest } from '../../../../../models/request';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list.component.html',
  styleUrls: ['../../users/list/list.component.css']
})
export class ListComponent implements OnInit {

 
  @Output() openForm: EventEmitter<deviceRequest> = new EventEmitter();

  listRequest: Request[] = [];
  list: Request[]=[];
  listHeaders: String[] = ["Nro","Email","Fecha","Hora","Acciones"];
  actualPage: number = 1;
  search_value:string;
  request: Request;
  deviceRequest: deviceRequest;
  constructor(private requestService: RequestsService) { }

  ngOnInit() {
    this.getRequestList();
    this.list=this.listRequest;
  }

  deleteRequest(id:string) {
    if (confirm("¿Esta seguro de quere eliminar a esta solicitud?")){
      this.requestService.deleteRequest(id).catch(
        err => console.log(err)
      );
    }    
  }

  getRequestList() {
    this.requestService.getRequestList().snapshotChanges().subscribe(res =>{
      this.listRequest.length = 0;
      res.forEach(t => {
        const r = t.payload.toJSON();
        r['$id'] = t.key;
        this.listRequest.push(r as Request)
      });
    });
  }

  search(){
    this.list = this.listRequest.filter(res=>{
      return res.correo.toLowerCase().match(this.search_value.toLocaleLowerCase());
    });
  }

  showForm(request: Request, device: boolean ){
    this.deviceRequest = new deviceRequest();
    this.deviceRequest.device = device;
    this.deviceRequest.event = true;
    this.openForm.emit(this.deviceRequest);
    this.requestService.selectedRequest = Object.assign({}, request);
  }

}
