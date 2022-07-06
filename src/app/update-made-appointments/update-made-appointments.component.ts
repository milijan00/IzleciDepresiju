import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseFormComponent } from '../baseClasses/baseFormComponent';
import { ITherapist } from '../interfaces/ITherapist';
import { ITimeFromTo } from '../interfaces/ITimeFromTo';
import { TherapistsService } from '../services/therapists/therapists.service';
import { TimesFromToService } from '../services/timesFromTo/times-from-to.service';
import { IWorkday } from '../interfaces/IWorkday';
import { WeekdaysService } from '../services/weekdays/weekdays.service';
import { AppointmentsService } from '../services/appointments/appointments.service';
import { TimeService } from '../services/time/time.service';
import { ITimesForChosenTherapistAndWorkday } from '../interfaces/ITimesForChosenTherapistAndWorkday';
import { Observable } from 'rxjs';
import { ModalComponent } from '../model/modal.component';

@Component({
  selector: 'app-update-made-appointments',
  templateUrl: './update-made-appointments.component.html',
  styleUrls: ['./update-made-appointments.component.scss']
})
export class UpdateMadeAppointmentsComponent extends BaseFormComponent{
  protected submitMessage: string = "Uspešno ste izmenili termin.";
  therapists  : ITherapist[]= [];
  times : ITimesForChosenTherapistAndWorkday[]= [];
  workdays : IWorkday[] = [];
  valuesAreLoadedInitialy : {[key : string] : boolean} = {
    "therapistId" : false,
    "workdayId" : false,
    "timesId" : false
  };

  constructor(
    private therapistsService : TherapistsService,
    private madeAppointmentsService : AppointmentsService,
    private workdayService : WeekdaysService,
    private timesService :TimeService 
    ){
    super({
      therapist : new FormControl(""),
      time : new FormControl(""),
      workday : new FormControl("")
    });
    this.therapistsService.get().subscribe(res => {
      this.therapists = res;
      this.setDropDownListsValue(this.form.controls['therapist'], 'therapistId', res);
      this.loadWorkdays();
    });
    
  }

  sendServerRequest(): Observable<any> {
    return this.madeAppointmentsService.put(this.availableAppointmentId);
  }

  setDropDownListsValue(control : AbstractControl, item : string, response: any){
    let id : string | null; 
    if(this.valuesAreLoadedInitialy[item] == true){
      id =  response[0].id;
    }else {
      this.valuesAreLoadedInitialy[item] = true;
      id = localStorage.getItem(item);
      if(id == null){
        id =  response[0].id;
    }
    }
    control.setValue(id);
    
  }
  get userId(){
    return this.form.controls["therapist"].value;
  }
  get workdayId(){
    return this.form.controls["workday"].value;
  }
  get availableAppointmentId(){
    return this.form.controls['time'].value;
  }
  async updateOtherTwoDropDowns(){
    await this.loadWorkdays();
    if(this.userId != null && this.workdayId != null){
      await this.updateAppointments();
    }
  }

  loadWorkdays(){
    let therapistId = this.userId;
    this.workdayService.getWorkdaysOfTherapist(therapistId).subscribe( w => {
      this.workdays = w;
      this.setDropDownListsValue(this.form.controls['workday'], "workdayId", w);
      this.loadTimes();
    })
  }
  loadTimes(){
    this.timesService.find(this.userId, this.workdayId).subscribe(res => {
      this.times = res;
      if(res.length > 0){
        this.form.controls["time"].setValue(res[0].availableAppointmentId);
      }
    });
  }
  updateAppointments(){
    this.timesService.find(this.userId, this.workdayId).subscribe(res => this.times = res);
  }

   override onSubmit() {
		if(this.validate()){
			this.sendServerRequest().subscribe(res =>{
				this.takeResponse(res);
				ModalComponent.setContent(this.submitMessage);
				ModalComponent.showModel();
			});
		}else {
			ModalComponent.setContent("Unete vrednosti nisu u dobrom formatu.");
			ModalComponent.showModel();
		}
   }

  takeResponse(response: any): void {

  }
}
