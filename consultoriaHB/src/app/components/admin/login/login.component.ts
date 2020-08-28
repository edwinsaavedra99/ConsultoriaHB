import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { NotificationService } from '../../../services/notification/notification.service'
import { User } from '../../../models/user'
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router'

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
  constructor(
    private formBuilder : FormBuilder,
    private userService: LoginService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute 
    ) {  }

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
          let response = res[0];
          let  user = response.payload.toJSON();
          user['$id'] = response.key;
          this.user = user as User;
          if (this.user.password==this.password_value){
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

}
