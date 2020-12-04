import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { NotificationService } from '../../../services/notification/notification.service'
import { User } from '../../../models/user'
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router'
import {Md5} from 'ts-md5/dist/md5';
import {MessageService } from '../../../services/message_email/message_email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataForm: any;
  email_value:string;
  password_value:string;
  user: User;
  isLogged:boolean = false;
  md5:Md5;
  reset_password:boolean=false;
  reset_password_form:any;

  constructor(
    private formBuilder : FormBuilder,
    private userService: LoginService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
    ) { 
     }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      email : ['', {
        validators: [
          Validators.email,
          Validators.required
        ]
      }],
      password:['', {
        validators: [
          Validators.required
        ]
      }]
    });
    this.reset_password_form = this.formBuilder.group({
      email : [ '', {
        validators: [
          Validators.email,
          Validators.required
        ]  
      }]
    });
  }

  emailpassword(){
    return this.reset_password_form.get('email');
  }

  email(){
    return this.dataForm.get('email');
  }

  password(){
    return this.dataForm.get('password')
  }

  submit(){
    this.isLogged = true;
    this.userService.getUserbyEmail(this.email_value).snapshotChanges().subscribe(  
      res =>{
        if (res.length==0){
          this.isLogged = false;
          this.notificationService.error("Credenciales Invalidas", "Usuario o contraseña incorrecto.")
        } else{
          this.md5 = new Md5();
          let password_encrypted:string = this.md5.appendStr(this.password_value).end().toString();
          console.log(password_encrypted)
          //let password_encrypted:string = this.password_value;
          let response = res[0];
          let  user = response.payload.toJSON();
          user['$id'] = response.key;
          this.user = user as User;
          if (this.user.password==password_encrypted){
            this.userService.addSession(this.user)
              .then(
                result =>{
                  let session_id:string =result.path.pieces_[1];
                  this.cookieService.set('login', session_id, 30, '/');
                  this.isLogged = true; 
                  this.notificationService.sucess("Sesión iniciada", "Bienvenid@ " + this.user.fullname + " por favor espere mientras es redereccionado")
                  window.location.reload();
                }
              )
              .catch(
                err => {
                  console.log(err)
                  this.notificationService.error("Ocurrio un error", "No se pudo iniciar su sesión.")
                }
              );
          } else {
            this.isLogged = false;
            this.notificationService.error("Credenciales Invalidas", "Usuario o contraseña incorrecto.")
          }
        }
      }
    )
  }

  reset_password_action(){
    this.userService.getUserbyEmail(this.reset_password_form.value.email).snapshotChanges().subscribe(  
      res =>{
        if (res.length==0){
          this.isLogged = false;
          this.notificationService.error("Correo no registrado", "Este correo no ha sido regitrado previamente por un Administrador, por favor solicite a uno que le otorgue acceso mediante un registro.")
        } else{
          let response = res[0];
          let  user_json = response.payload.toJSON();
          user_json['$id'] = response.key;
          let user:User = user_json as User;
          this.userService.requestResetPassword(user)
          .then( res =>{
            this.notificationService.sucess("Solicitud enviada", "Por favor revisa tu correo.");
            //console.log(this.reset_password_form.value.email);
            console.log(this.messageService.messagePassword(this.reset_password_form.value.email, window.location.href +"/"+res.key));
            //window.location.href = window.location.href +"/"+res.key;
//            console.log(window.location.href +"/"+res.key)
          }).catch(
            error=>{
              this.notificationService.error("Error", "No se pudo crear la solicitud.")
            }
          )
        }
      }
    )
  }

}
