import { Component, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../../login/login.component.css']
})
export class ResetpasswordComponent implements OnInit {
  dataForm:any;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
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
    alert('esto aun no esta implementado')
  }

  password(){
    return this.dataForm.get('password')
  }

}
