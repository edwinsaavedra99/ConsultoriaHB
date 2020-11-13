import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Info } from '../../models/info'
import { Company } from '../../models/company';
import{ init } from 'emailjs-com';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { NotificationService } from '../../services/notification/notification.service'
//init("user_W6btBArAnPt3qti8Z41D3");

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private dbPath = '/company';

  companyRef: AngularFireList<Company> = null;
  companyObject : AngularFireObject<Company>;
  selectedCompany: Company = new Company();
  company : Company = new Company();
  apiMessage1 = {
    service_id:'service_pup8ucs',
    template_id:'template_w9qcjtn',
    user_id:'user_W6btBArAnPt3qti8Z41D3'
  };
  status : boolean = false;

  constructor(private db: AngularFireDatabase,
    private notificationService: NotificationService) {
    this.companyRef = db.list(this.dbPath);
    this.companyObject = db.object(this.dbPath);
    this.getCompanyItem().valueChanges().subscribe( res=>{
        this.company = res        
      });
  }

  changePassword(email: string){
      //generar clave para cambio de contraseña ???
        return 'clave';
  }

  messagePassword(email: string): any {
    //template 1      
    const templateParams = {
      message: this.changePassword(email),
      to_email: email,
      from_name: 'Recuperar Contraseña - Consulta Legal',
      from_team: 'Legal Hoffmann',
      notes: 'Check this out!'
    };
    this.sendEmail(templateParams);      
    return this.status;
  }
 
  messageClientToAdmin(email: string,message1:string): any {
      //template 1
    const templateParams = {
        message: message1,
        to_email: this.company.email,
        from_name: 'Consulta Legal',
        from_team: 'Legal Hoffmann',
        notes: 'Check this out!'
      };
      this.sendEmail(templateParams);      
      return this.status;
  }

  messageAdminToClient(email: string,message1:string): any {
      //template 2
    //console.log(email);
    //console.log(this.company);
    const templateParams = {
        message: message1,
        to_email: email,
        from_name: 'Consulta Legal',
        from_team: 'Legal Hoffmann',
        notes: 'Check this out!'
      };
      this.sendEmail(templateParams);      
      return this.status;
     
  }

  messageImmediate(email: string): any {
      //template 1
      const templateParams = {
        message: 'Gracias por confiar en nosotros, responderemos muy pronto, si la situación es urgente puede comunicarse al ' + this.company.phone,
        to_email: email,
        notes: 'Check this out!'
      };
      this.sendEmail(templateParams);      
      return this.status;
  }
 
  getCompanyItem(): any {
    return this.companyObject;
  }
  getCompany(){
    return this.company;
  }  
  private sendEmail(templateParams) {
    
    emailjs.send(this.apiMessage1.service_id, this.apiMessage1.template_id, templateParams, this.apiMessage1.user_id)
      .then((result: EmailJSResponseStatus) => {
        this.status = true;
        this.notificationService.sucess("Proceso Exitoso", "El mensaje fue enviado.")
        console.log('SUCCESS!', result.status, result.text);
      }, (error) => {
        this.notificationService.error("Ocurrio un error", "Error al enviar.")
        console.log('FAILED...', error);
        this.status = false;
      });
  }
}