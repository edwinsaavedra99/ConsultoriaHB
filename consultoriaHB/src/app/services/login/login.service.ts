import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { User } from '../../models/user'
import { Session } from '../../models/session'
import { ResetPasswordRequest } from '../../models/request'
import { CookieService } from 'ngx-cookie-service'
import { NotificationService } from '../../services/notification/notification.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dbPath = '/user';
  private path = '/session'
  userRef: AngularFireList<User> = null;
  userSelected: User = new User();
  sessionRef: AngularFireList<Session> = null;
  user:User;
  session:string;
  resetPasswordRef: AngularFireList<ResetPasswordRequest> = null;
  resetPasswordPath = '/reset_password_request'
  constructor(private db: AngularFireDatabase, 
    private cookieService: CookieService, 
    private notifiactionService: 
    NotificationService) {
    this.userRef = db.list(this.dbPath);
    this.sessionRef = db.list(this.path);
    this.resetPasswordRef = db.list(this.resetPasswordPath);

  if (this.cookieService.check('login')){
      this.user = new User();
      this.session = this.cookieService.get('login');
      this.db.object<Session>(this.path+'/'+this.session).snapshotChanges().subscribe(
        res => {
          if (res.payload.exists()){
            this.db.object<User>(this.dbPath+'/'+res.payload.val().user_key).snapshotChanges().subscribe(
              res_user => {
                if (res_user.payload.exists()){
                  this.user = res_user.payload.val();
                  
                } else {
                  this.notifiactionService.error("Sesion caduca", "Su sesion ha caducado, por favor inice sesion nuevameinte");
                  this.session = null;
                  this.logout();
                  window.location.reload();
                }
              }
            );
          } else {
            this.notifiactionService.error("Sesion caduca", "Su sesion ha caducado, por favor inice sesion nuevamente");
            this.session = null;
            this.logout();
            window.location.reload();

          }
        }
        
      );
    } else {
      this.session=null;
    }

  }

  isAuthenticated(){
    //return this.session!=null;
    return this.user !=null;
  }

  getUserbyEmail(email: string) {
      this.userRef = this.db.list(this.dbPath, 
      ref=> ref.orderByChild('email').equalTo(email)
    ) as AngularFireList<User>;
    return this.userRef;
  }

  addSession(user: User): any {
    const session: Session = new Session;
    session.user_key = user.$id;
    let date: Date  = new Date();
    session.date_created = date.getDate() +"/" + (date.getMonth()+1) + "/" + date.getFullYear();
    session.time_created = date.getHours()+":" + date.getMinutes() + ":" + date.getSeconds();
    
    return this.sessionRef.push(session);
  }

  logout(){
    let session_id:string = this.cookieService.get('login'); 
    this.cookieService.delete('login','/');
    this.sessionRef.remove(session_id);
  }

  getUser(){
    return this.user;
  }

  requestResetPassword(user: User){
    let request:ResetPasswordRequest = new ResetPasswordRequest();
    let date:Date = new Date();
    request.user_key = user.$id;
    request.date = date.getDate() +"/" + (date.getMonth()+1) + "/" + date.getFullYear();
    request.time = date.getHours()+":" + date.getMinutes() + ":" + date.getSeconds();
    return this.resetPasswordRef.push(request);
  }

  getRequestResetPassword(key: string){
    return this.db.object<ResetPasswordRequest>(this.resetPasswordPath+'/'+key)
  }
  deleteRequestResetPassword(id: string): Promise<void> {
    return this.resetPasswordRef.remove(id);
  }
}