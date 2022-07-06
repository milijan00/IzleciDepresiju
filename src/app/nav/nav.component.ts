import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavLink } from '../interfaces/INavLink';
import { LoginService } from '../services/login/login.service';
import { NavService } from '../services/nav/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navLinks  : INavLink[]= [];
  toggleClass : string = "hide-users-menu";
  arrow : string  = "fas fa-arrow-alt-circle-down";
  isUsersMenuHidden : boolean = true;
  constructor(private _service : NavService, private _loginService : LoginService, private router : Router) { 

  }

  ngOnInit(): void {
    this._service.get().subscribe(res => {
      this.navLinks = res;
      this.changeActiveLink(this.router.url);
    });
  }

  get isUserLoggedIn(){
    // return NavComponent.isUserSignedIn;
    return this._loginService.isLoggeddIn();
  }
  private changeActiveLink(url : string = "/") : void{
    for(let l of this.navLinks) {
      if(url === l.route){
        l.state = "active";
      }else {
        l.state = "";
      }
    }
  }
  onClick(url : string = "/") : void{
    this.changeActiveLink(url);
  }
  logoutUser(){
    this._loginService.logout();
    this.toggleUsersMenu();
  }
  get username(){
    var username = this._loginService.getUsername();
    // console.log(username);
    return  username;
  }
  toggleUsersMenu(){
    if(this.isUsersMenuHidden) {
      this.toggleClass = "show-users-menu";
      this.arrow = "fas fa-arrow-alt-circle-up";
    }else {
      this.toggleClass = "hide-users-menu";
      this.arrow = "fas fa-arrow-alt-circle-down";
    }
    this.isUsersMenuHidden = !this.isUsersMenuHidden;
  }


}
