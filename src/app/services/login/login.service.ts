import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../BaseService';
import { Moment } from 'moment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http : HttpClient, private router : Router) { super();}

  post(email : string, password : string) : Observable<IToken>{
    return this.http.post<IToken>(this.URL + "login", {
      "email" : email,
      "password" : password
    });
  }
  isLoggeddIn(){
    return localStorage.getItem("token") != null;
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["login"]);
  }
  getUsername(){
    return this.tokenJson.Username;
  }
  private get tokenJson(){
    let token = localStorage.getItem("token") || "";
    let atobData = atob(token.split('.')[1]) ;
    return  JSON.parse(atobData);
  }
  get userId(){
    return this.tokenJson.UserId;
  }
  get token(){
    return localStorage.getItem("token") || "";
  }
  get date(){
    return moment.utc(this.tokenJson.exp, "YYY-MM-DD HH:mm:ss");
  }
  get tokenIsValid() : boolean{
    // trenutni > zadati -> istekao
    // trenutni < zadati -> u redu
    // return moment().diff(date, "minutes") < 0;
    // return moment().isAfter(this.date);
    const expiry = this.tokenJson.exp;
  return (Math.floor((new Date).getTime() / 1000)) < expiry;
  }
}
export interface IToken{
  token : string
}
