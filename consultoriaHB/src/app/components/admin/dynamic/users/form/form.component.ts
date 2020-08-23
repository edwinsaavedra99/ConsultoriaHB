import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';
import { titleValidation } from 'src/app/validations/title-validation.directive';
import { UsersService} from '../../../../../services/users/users.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../info/form/form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() visible: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  dataForm: any;
  constructor(private formBuilder : FormBuilder, private userService: UsersService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      fullname : ['',{
        validators:[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
          Validators.pattern('^[a-zA-Z0-9 ]*$')
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
}
