import { Component, OnInit } from '@angular/core';
import { NewsService} from '../../../../services/news/news.service';
import { New } from '../../../../models/new';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  totalRecords: String;
  page: Number= 1;
  noticias:New[]=[];

  listNew: New[] = [];

  constructor(private newService: NewsService) { 
    this.getAreaList();
    this.noticias=this.listNew;
    this.listNew.length = 12;
  }
  ngOnInit(): void {
  }
  getAreaList() {
    this.newService.getNewList().snapshotChanges().subscribe(res=>{
      this.listNew.length = 0;
      res.forEach( t=>{
        const new1 = t.payload.toJSON();
        this.listNew.push(new1 as New)

      })
    });
  }
  



}
