import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAppointment } from '../interfaces/IAppointment';
import { ITimeFromTo } from '../interfaces/ITimeFromTo';
import { IWeekday } from '../interfaces/IWeekday';
import { AvailableAppointment } from '../models/availableAppointment';
import { Schedule } from '../models/schedule';
import { Therapist } from '../models/therapist';
import { Time } from '../models/time';
import { Weekday } from '../models/weekday';
import { Workday } from '../models/workday';
import { AppointmentsService } from '../services/appointments/appointments.service';
import { SubscriptionManager } from '../services/subscriptionManager';
import { TherapistsService } from '../services/therapists/therapists.service';
import { TimeService } from '../services/time/time.service';
import { TimesFromToService } from '../services/timesFromTo/times-from-to.service';
import { WeekdaysService } from '../services/weekdays/weekdays.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  selectedTherapist : Therapist | undefined ;
  therapists : Therapist[] = [];
  therapistFormControl = new FormControl("");
  private  therapistRole = 2;

  weekdays : Weekday[] = [new Weekday(0, "SkipMe")];
  times : Time[] = [];
  timesFromTo : ITimeFromTo[] = [];

  appointments : IAppointment[] = [];
  appointmentIsFound : boolean = false;

  dataLoaded : boolean = false;
  constructor(
      private therapistService : TherapistsService,
      private weekdaysService : WeekdaysService,
      private timeService : TimeService ,
      private timesFromToService : TimesFromToService,
      private appointmentsService : AppointmentsService
     ) { }

  ngOnInit(): void {
    this.getData();
  }
   getData(){
    let subscription;
     subscription =  this.therapistService.get().subscribe(res =>{
      this.therapists = res;
      this.selectedTherapist = this.therapists[0];
      this.therapistFormControl.setValue(this.selectedTherapist?.id) ;
      this.weekdaysService.get().subscribe(res => {
        res.forEach(e => this.weekdays.push(e))
        this.timeService.get().subscribe(res => {
          this.times = res
          this.timesFromToService.get().subscribe(res => { 
            this.timesFromTo = res;
            this.appointmentsService.get().subscribe(res => {this.appointments = res;  this.createSchecule()});
          })
        });
      });
    });
  }
  onChange(){
    this.selectedTherapist = this.therapists.find(x => x.id == this.therapistFormControl.value);
  }

  createSchecule() : void{
     this.therapists.forEach(therapist => {
      var schedule : Schedule = new Schedule(therapist.id, []);
      var workdays = this.timesFromTo.filter(tFT => therapist.id == tFT.userId).map(tFT => {
          var name = this.weekdays.find(w => w.id == tFT.workdayId)?.name;
          var workday= new Workday(tFT.workdayId, name, []);
          workday.appointments = this.timesFromTo.filter(t => t.userId == therapist.id && workday.id == t.workdayId).map(t =>{
            let value = this.times.find(time => time.id == t.timeFromId)?.value;
            var timeFrom =  (value == undefined)? "" : value;
            value = this.times.find(time => time.id == t.timeToId)?.value;
            var timeTo = (value == undefined)? "" : value;
            var userId = this.appointments.find(a => a.availableAppointmentId == t.id)?.userId;
            return new AvailableAppointment(t.id, t.timeFromId, t.timeToId, timeFrom, timeTo, userId);
          });
            return workday;
      });

      schedule.getUniqueWorkdays(workdays);
      therapist.schedule = schedule;
     });
     this.dataLoaded = true;
  }
  

  appointmentFound(day: string, time: string) : boolean{
    var workday = this.selectedTherapist?.schedule.getWorkday(day);
    if(workday == undefined) return false;
    var appointment = workday.getAppointment(time);

    if(appointment == undefined) return false;
    this.appointmentIsFound = workday.isAppointmentFree(appointment);
    return true;
  }
  
}
