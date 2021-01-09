import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company';
import { CompanyService } from '../../../../services/company/company.service';
import { NotificationService } from '../../../../services/notification/notification.service'
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
   company : Company = new Company();

      constructor(private companyService: CompanyService){
		this.companyService.getCompanyItem().valueChanges().subscribe( res=>{
        this.company = res;
       });
  }
 isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
   
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

 }

