import { Component, OnInit,HostListener } from '@angular/core';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor() { }
  @HostListener('window:scroll',['$event'])
  doSomethingOnWindowScroll(e){
    let element = document.querySelector('.header');
    let elem = document.getElementById('#menu-btn');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('asas');
    } else {
      //if(document.getElementById('#menu-btn').getAttribute('checked')){
        //element.classList.add('asas');
      //}else{
      element.classList.remove('asas');
      //}
    }
  }

  ngOnInit() {
  }

  

}
