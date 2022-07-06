import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseFormComponent } from '../baseClasses/baseFormComponent';
import { ModalComponent } from '../model/modal.component';
import { IToken, LoginService } from '../services/login/login.service';
// import * as moment from 'moment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent{

  password = {
    input : "password",
    icon : "fas fa-eye"
  };
  protected submitMessage: string = "Uspešno ste se prijavili.";
  
  constructor( 
    private service : LoginService,
    private router: Router 
    ) { 
    super({
    email : new FormControl("", [
      Validators.required,
      Validators.email
      // Validators.pattern("^[A-z0-9_\.]{3,20}$")
    ]),
    password : new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern("^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,16}$")
    ])
  });
  }

  // ngOnInit(): void {
  // }
  sendServerRequest(): Observable<any> {
    return this.service.post(this.form.controls['email'].value, this.form.controls['password'].value);
  }  
  
  takeResponse(response: any): void {
      if(localStorage){
        localStorage.setItem("token", response.token);
        this.router.navigate(["/"]);
      }
  }
  onToggle(){
    if(this.password.input == "password"){
      this.password.input = "text";
      this.password.icon = "fas fa-eye-slash";
    }else if (this.password.input == "text"){
      this.password.input = "password";
      this.password.icon = "fas fa-eye";
    }
  }
  
}
