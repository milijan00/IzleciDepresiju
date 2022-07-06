import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from '../baseClasses/baseFormComponent';
import{IClearForm} from "../interfaces/iclearform";
import { ModalComponent } from '../model/modal.component';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseFormComponent {

  protected submitMessage: string = "Uspešno ste se registrovali.";
  passwordAlertClassValue="d-none" ;
  password = {
    type : "password",
    icon : "fas fa-eye"
  };
  passwordAgain = {
    type : "password",
    icon : "fas fa-eye"
  };
  // passwordInputType = "password";
  // passwordAgainInputType = "password";
  // pass
  constructor() { 

    super({
    firstname : new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern("^[A-ZŠĐŽĆČ][a-zšđžčć]{1,15}(\s[A-ZŠĐŽĆČ][a-zšđžčć]{1,15}){0,1}$")
    ]),
    lastname : new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern("[A-ZŠĐŽĆČ][a-zšđžčć]{1,15}(\s[A-ZŠĐŽĆČ][a-zšđžčć]){0,1}")
    ]),
    email  : new FormControl("",[
      Validators.email,
      Validators.required,
    ]),
    password : new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,16}$"),
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    passwordAgain : new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,16}$"),
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    username : new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern("[A-z0-9_\.]{3,20}")
    ])
  });
  }

  // ngOnInit(): void {
  // }
 sendServerRequest(): Observable<any> {
    return new Observable();
 } 
 override async onSubmit() {
   if(this.passwordsAreOk()){
      if(this.validate() ){
        await this.sendServerRequest();
        this.clearForm();
        ModalComponent.setContent(this.submitMessage);
      }else {
        ModalComponent.setContent("Unete vrednosti nisu u dobrom formatu.");
      }
   }else {
     ModalComponent.setContent("Šifre moraju biti iste.");
   }
		ModalComponent.showModel();
 }
  private passwordsAreOk() : boolean{
    if(this.form.controls['password'].value != this.form.controls["passwordAgain"].value){
      this.passwordAlertClassValue = "d-block";
      return false;
    }else {
      this.passwordAlertClassValue = "d-none";
      return true;
    }
  }
  // private switchInputState(value : string) : void{
  //   if(value == "text"){
  //     value = "password";
  //   }else if (value == "password"){
  //     value = "text";
  //   }
  // }
  togglePassword()  : void{
    if(this.password.type == "text"){
      this.password.type = "password";
      this.password.icon = "fas fa-eye";
    }else if (this.password.type == "password"){
      this.password.type = "text";
      this.password.icon = "fas fa-eye-slash";
    }
  }

  takeResponse(response: any): void {
    console.log("zahtev poslat na server");// ovo je povratna vrednost jer nije na serveru pokriven taj slucaj koriscenja
  }

  togglePasswordAgain() : void{
    if(this.passwordAgain.type == "text"){
      this.passwordAgain.type = "password";
      this.passwordAgain.icon = "fas fa-eye";
    }else if (this.passwordAgain.type == "password"){
      this.passwordAgain.type = "text";
      this.passwordAgain.icon = "fas fa-eye-slash";
    }
  }
}
