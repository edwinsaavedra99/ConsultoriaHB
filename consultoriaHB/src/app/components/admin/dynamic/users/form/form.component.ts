import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { UsersService} from '../../../../../services/users/users.service';
import { User } from '../../../../../models/user'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../info/form/form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  dataForm: any;
  user: User = new User();
  constructor(private formBuilder : FormBuilder, private userService: UsersService) { }

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
      this.user.fullname = this.dataForm.value.fullname;
      this.user.email = this.dataForm.value.email;
      this.user.password = this.dataForm.value.password1;
      this.addUser(this.user);
    }
  }

  closeModal() {
    this.close.emit(false);
    this.refrescar();
  }

  refrescar(){
    this.dataForm.patchValue({
      fullname: '',
      email: '',
      password1: ''
    });
  }

  addUser(data: User) {
    this.userService
      .addUser(data)
      .then(result =>{
        this.closeModal()
        console.log(result)
      }).catch(err => {
        console.log(err);
        alert('Error')
      });
  }
}
