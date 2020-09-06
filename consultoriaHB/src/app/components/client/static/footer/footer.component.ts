import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company';
import { CompanyService } from '../../../../services/company/company.service';
import { NotificationService } from '../../../../services/notification/notification.service'
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

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
 ngOnInit() {
      
  }
 }

 