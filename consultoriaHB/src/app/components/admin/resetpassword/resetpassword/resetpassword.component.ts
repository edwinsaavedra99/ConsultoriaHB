import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service'
import { NotificationService } from '../../../../services/notification/notification.service'
import { UsersService } from '../../../../services/users/users.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../../login/login.component.css']
})
export class ResetpasswordComponent implements OnInit {
  dataForm:any;
  user:User
  md5:Md5
  user_updated:User
  request_key:string

  constructor(
    private formBuilder : FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private notificactionService: NotificationService,
    private userService: UsersService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      res =>{
        let key:string =res['request'];
        this.loginService.getRequestResetPassword(key).snapshotChanges().subscribe(
          res =>{
            if (res.payload.exists()){
              this.request_key = res.payload.val().$id 
              this.userService.getUserByKey(res.payload.val().user_key).snapshotChanges().subscribe(
                res=>{
                  if (res.payload.exists()){
                    this.user_updated = new User()
                    this.user = res.payload.val();
                    this.user.$id = res.key;
                  } else {
                    this.notificactionService.error("Usuario incorrecot", "El usuario al que quiere cambiar contraseña no existe.")
                    this.loginService.deleteRequestResetPassword(this.request_key);
                  }
                }, error=>{
                  this.notificactionService.error("Error obteniendo datos", "No se pudieron acceder a los datos de usuario. Por favor intente mas tarde.")
                }
              );
            } else {
              this.notificactionService.error("Formulario no disponible", "Usted debe haber accedido a un enelace caducado o inexistente.")
              this.router.navigate(['/login'])
            }
          }, error => {
            this.notificactionService.error("Error obteniendo datos", "Por favor intentalo más tarde")
          }
        );
      }
    );
    this.dataForm = this.formBuilder.group({
      password:['', {
        validators: [
          Validators.pattern('^(.*[0-9].*)+$'),
          Validators.minLength(6),
          Validators.required
        ]
      }]
    });
  }
//consulta@hoffmannb.com
  submit(){
    let password_value:string = this.dataForm.value.password
    this.md5 = new Md5();
    let password_encrypted:string = this.md5.appendStr(password_value).end().toString()
    this.user_updated.password = password_encrypted;
    this.userService.updateUser(this.user.$id, this.user_updated)
    .then(
      res=>{
        this.loginService.deleteRequestResetPassword(this.request_key)
        this.notificactionService.sucess("Proceso exitoso", "El cambio de contraseña fue exitoso")
        this.router.navigate(['/login'])
      },
      on =>{
        console.log(on)
      }
    ).catch(
      err=>{
        console.log(err)
        this.notificactionService.error("Error", "No se puedo realizar el cambio de contraseña")
      }
    )
  }

  password(){
    return this.dataForm.get('password')
  }

}
