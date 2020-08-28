import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { UsersService} from '../../../../../services/users/users.service';
import { User } from '../../../../../models/user'
import { NotificationService } from '../../../../../services/notification/notification.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../info/form/form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  dataForm: any;
  listUser: User[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private userService: UsersService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      fullname : ['',{
        validators:[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          Validators.pattern("^([\nña-zA-ZÀ-ÿ\u00f1\u00d10-9., '-])*$")
        ]
      }],
      email : ['', {
        validators: [
          Validators.email,
          Validators.required
        ]
      }],
      password1:['', {
        validators: [
          Validators.pattern('^(.*[0-9].*)+$'),
          Validators.minLength(6),
          Validators.required
        ]
      }]
    });
    this.getUserList()
  }

  getUserList() {
    this.userService.getUserList().snapshotChanges().subscribe(res =>{
      this.listUser.length = 0;
      res.forEach(t => {
        const user = t.payload.toJSON();
        user['$id'] = t.key;
        this.listUser.push(user as User)
      });
    });
  }

  fullname(){
    return this.dataForm.get('fullname');
  }

  email(){
    return this.dataForm.get('email');
  }

  password1(){
    return this.dataForm.get('password1')
  }

  submit(){

    if(!this.dataForm.valid){
      alert('Los datos no son correctos');
    } else {
      if (this.getUser().$id == undefined){
        this.addUser(this.getUser());
      } else {
        this.updateUser(this.getUser());
      }

    }
  }

  closeModal() {
    this.close.emit(false);
    this.userService.userSelected = new User();
    this.refrescar();
  }

  refrescar(){
    this.dataForm.reset();
  }

  updateUser(user:User){
    if(confirm('¿Esta seguro de querer guardar su edición?')){
      let subscribe = this.userService.getUserbyEmail(user.email).snapshotChanges()
      .subscribe(
        res =>{
          if (res.length==0){
            subscribe.unsubscribe()
            this.updateUserVerified(user);
          } else if (res.length==1 && res[0].payload.key == user.$id){
            subscribe.unsubscribe()
            this.updateUserVerified(user)
          } else{
            subscribe.unsubscribe()
            this.notificationService.error("Usuario duplicado", "El correo " + user.email + " ya esta en uso")
          }
        }
      )
    


      
    }
  }

  updateUserVerified(user:User){
    this.userService.updateUser(user.$id, this.dataForm.value)
      .then(
        result =>{
          this.notificationService.sucess("Proceso Exitoso", "Usuario fue editado con exito.")
          this.closeModal()
        }
      )
      .catch(
        err => {
          this.notificationService.error("Ocurrio un error", "No se pudo editar el usuario.")
        }
      );
  }

  addUser(data: User) {
    let subscribe = this.userService.getUserbyEmail(data.email).snapshotChanges()
    .subscribe(
      res =>{
        if (res.length==0){
          subscribe.unsubscribe()
          this.userService.addUser(data).then(
            result =>{
              this.notificationService.sucess("Proceso Exitoso", "Usuario registrado con exito.")
              this.closeModal();
            }).catch(
               err => {
                 this.notificationService.error("Ocurrio un error", "No se pudo registrar el usuario.")
                }
            );
          } else if (res.length>0) {
            subscribe.unsubscribe()
            this.notificationService.error("Usuario duplicado", "El correo " + data.email + " ya esta en uso")
          }
      }, error=>{
        this.notificationService.error("Ocurrio un error", "No se pudo registrar el usuario.")
      }
    )
  }

  getUser(){
    return this.userService.userSelected;
  }
}
