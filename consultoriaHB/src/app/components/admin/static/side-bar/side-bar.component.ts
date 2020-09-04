import { Component, OnInit, Input} from '@angular/core';
import { LoginService } from '../../../../services/login/login.service'
import { User } from '../../../../models/user'
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {

  }

  getUser(){
    return this.loginService.user;
  }

}
