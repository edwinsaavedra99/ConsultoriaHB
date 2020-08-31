import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service'
import { NotificationService } from '../../../../services/notification/notification.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) {
   }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
    this.notificationService.warning("Sesion cerrada","Has cerrado tu sesión, nos vemos luego.")
    //window.location.reload();
    this.router.navigate(['/login']);
  }

  getUser(){
    return this.loginService.user;
  }



}
