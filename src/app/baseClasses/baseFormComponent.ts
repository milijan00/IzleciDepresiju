import { OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { IClearForm } from "../interfaces/iclearform";
import { ModalComponent } from "../model/modal.component";

export abstract class BaseFormComponent implements IClearForm{

	form:  FormGroup;
	protected abstract submitMessage : string ;
	constructor(controls : any){
		this.form = new FormGroup(controls);
	}
	
	validate(): Boolean{
		if(this.form.valid){
			return true;
		}
		for(let c in this.form.controls){
			if(this.form.controls[c].invalid){
				this.form.controls[c].markAsTouched();
			}
		}
		return false;
	}
	clearForm(): void {
		this.form.reset();
	}
	abstract sendServerRequest() : Observable<any>;
	abstract takeResponse(response : any) : void;
	onSubmit(){
		if(this.validate()){
			this.sendServerRequest().subscribe(res =>{
				this.takeResponse(res);
				this.clearForm();
				ModalComponent.setContent(this.submitMessage);
				ModalComponent.showModel();
			});
		}else {
			ModalComponent.setContent("Unete vrednosti nisu u dobrom formatu.");
			ModalComponent.showModel();
		}
	}
	protected redirectUser(url : string){
		setTimeout(()=> location.href=url, 1000);
	}
}