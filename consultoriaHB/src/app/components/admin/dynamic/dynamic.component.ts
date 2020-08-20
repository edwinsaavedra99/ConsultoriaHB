import { Component, OnInit,OnDestroy , Inject, Renderer, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'dynamic-layout',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    //var html = document.getElementsByTagName("html")[0];
    //html.classList.add("dynamic");
    //var body = document.getElementsByTagName("body")[0];
    //  body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

  }
  ngOnDestroy() {
    //var html = document.getElementsByTagName("html")[0];
    //html.classList.remove("dynamic");
    //var body = document.getElementsByTagName("body")[0];
   // body.classList.remove("bg-default");
  }
}