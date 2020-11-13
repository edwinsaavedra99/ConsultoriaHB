import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { RequestsService} from '../../../../../services/requests/requests.service';
import { Request,deviceRequest } from '../../../../../models/request';
import { DeviceDetectorService } from 'ngx-device-detector';
import {MessageService} from '../../../../../services/message_email/message_email.service'
import { NotificationService } from '../../../../../services/notification/notification.service'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../news/form/form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() visible: deviceRequest;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  dataForm: any;
  deviceInfo = null;
  
  constructor(
    private formBuilder : FormBuilder,
    private requestsService: RequestsService,
    private notificationService: NotificationService,
    private deviceService: DeviceDetectorService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({      
      receptor : [''/*, {
        validators: [
          Validators.receptor,
          Validators.required
        ]
      }*/],
      message : ['',{
        validators:[
          Validators.required,
          Validators.minLength(5),
          //Validators.maxLength(500), no limite (o considerar por seguridad ?)
          //Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9., '-])*$") libertad para escribir
        ]
      }]
    });
    this.receptor.disable;
  }
  get receptor(){
    return this.dataForm.get('receptor');
  }
  message(){
    return this.dataForm.get('message')
  }

  submit(){
    if(!this.dataForm.valid){
      alert('Los datos no son correctos');
    } else {
      if (this.getRequest() == undefined){
        console.log('El dato no fue cargado');
      } else {
        if(this.visible.device){
          if(confirm('¿Esta seguro de querer enviar este mensaje de WhatsApp?')){
            //enviar whsap
            this.epicFunction(this.getRequest());
          }
        }else{
          if(confirm('¿Esta seguro de querer enviar este correo?')){
            //enviar correo electronico
            //this.sendEmail();
            /*if (*/this.messageService.messageAdminToClient(this.getRequest(),this.message().value)/*){*/
              //this.notificationService.sucess("Proceso Exitoso", "El mensaje fue enviado.")
            //}else{
              //this.notificationService.error("Ocurrio un error", "Error al enviar.")
            //}
          }
        } 
        
      }
      this.closeModal()
    }
  }

  
  closeModal() {
    this.close.emit(false);
    this.requestsService.selectedRequest = new Request();
    this.refrescar();
  }

  refrescar(){
    this.dataForm.reset();
  }  

  bodyMessageWp():string{
    var incognita = this.message().value;
    var out = incognita.toString().replace(/\s/g, "%20").trim();
    console.log(out);
    return out;
  }

  epicFunction(data:string) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(isDesktopDevice || isTablet ){
      //console.log("https://web.whatsapp.com/send?phone="+data+"&text="+this.bodyMessageWp());
      window.open("https://web.whatsapp.com/send?phone="+data+"&text="+this.bodyMessageWp(), "_blank");
      
    }else if(isMobile){
      window.open("https://whatsapp.com/send?phone="+data+"&text="+this.bodyMessageWp(), "_blank");
    //  whatsapp://send?text=www.google.com
    }

     
  }

  getRequest(){
    if(this.visible.device){
      return this.requestsService.selectedRequest.celular;
    }else{
      return this.requestsService.selectedRequest.correo;
    }     
  }
}
