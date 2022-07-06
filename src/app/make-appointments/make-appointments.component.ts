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
  selector: 'app-make-appointments',
  templateUrl: './make-appointments.component.html',
  styleUrls: ['./make-appointments.component.scss']
})
export class MakeAppointmentsComponent  extends BaseFormComponent {
  takeResponse(response: any): void {
  }
  protected submitMessage: string = "Uspešno ste zakazali seansu.";
  therapists  : ITherapist[]= [];
  times : ITimesForChosenTherapistAndWorkday[]= [];
  workdays : IWorkday[] = [];

  sendServerRequest(): Observable<any> {
    // alert(this.availableAppointmentId);
    return this.madeAppointmentsService.post(this.availableAppointmentId);
  }
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
      this.form.controls['therapist'].setValue(res[0].id);
      this.loadWorkdays();
    });
    
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
  setDropdownListsValue(control : AbstractControl, item : string, res : any){
    let id = localStorage.getItem(item);
    if(id != null){
      control.setValue(id);
    }else {
      control.setValue(res[0].id);
    }
  }
  loadWorkdays(){
    let therapistId = this.form.controls['therapist'].value;
    this.workdayService.getWorkdaysOfTherapist(therapistId).subscribe( w => {
      this.workdays = w;
      this.form.controls['workday'].setValue(w[0].id);
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

}
