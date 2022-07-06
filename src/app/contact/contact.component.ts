import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from '../baseClasses/baseFormComponent';
import { IClearForm } from '../interfaces/iclearform';
import { ModalComponent } from '../model/modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseFormComponent {

  protected submitMessage: string = "Poruka je uspešno poslata.";


  constructor() { 
    super({
    subject : new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
      // Validators.pattern("^[A-ZŠĐŽČĆa-zšđžčć0-9\s]{2,100}$") // izmeniti ukoliko naidjem na bolji
    ]),
    email : new FormControl("",[
      Validators.required,
      Validators.email

    ]),
    body : new FormControl("",[
      Validators.required,
      Validators.minLength(2)
      // Validators.pattern("^[A-Za-z0-9\s]{2,}$")
    ]) 
  });
  }

  ngOnInit(): void {
  }
  sendServerRequest(): Observable<any>{
    return new Observable(); // ovo je povratna vrednost jer nije na serveru pokriven taj slucaj koriscenja
  }
 override async onSubmit() {
      if(this.validate() ){
        await this.sendServerRequest();
        this.clearForm();
        ModalComponent.setContent(this.submitMessage);
      }else {
        ModalComponent.setContent("Unete vrednosti nisu u dobrom formatu.");
      }
		ModalComponent.showModel();
 }

  takeResponse(response: any): void {
      console.log("mejl je poslat .")
  }
}
