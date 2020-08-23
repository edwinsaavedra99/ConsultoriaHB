import { Injectable } from '@angular/core';
import { Notification } from '../../models/notification'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  SUCCESS:number = 1;
  WARNING:number = 2;
  ERROR:number = 3;
  notificationList: Notification[] = [];
  notification: Notification;
  constructor() { }

  createNotification(title:string, body: string, type: number){
    this.notification = new Notification();
    this.notification.title = title;
    this.notification.body = body;
    this.notification.type = type;
    return this.notification;
  }

  publishNotification(notification: Notification){
    this.notificationList.push(notification);
    setTimeout(this.removeNotificacion , 2000, this.notificationList)
  }

  removeNotificacion(notificationList: Notification[]){
    notificationList.shift();
  }

  sucess(title: string, body:string){
    this.publishNotification(this.createNotification(title, body, this.SUCCESS));
  }

  warning(title: string, body:string){
    this.publishNotification(this.createNotification(title, body, this.WARNING));
  }

  error(title: string, body:string){
    this.publishNotification(this.createNotification(title, body, this.ERROR));
  }
}
