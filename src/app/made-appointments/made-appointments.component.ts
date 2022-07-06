import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsersAppointments } from '../interfaces/IUsersAppointments';
import { AppointmentsService } from '../services/appointments/appointments.service';

@Component({
  selector: 'app-made-appointments',
  templateUrl: './made-appointments.component.html',
  styleUrls: ['./made-appointments.component.scss']
})
export class MadeAppointmentsComponent implements OnInit {

  madeAppointments : IUsersAppointments[] = [];
  constructor(
    private appointmentsService : AppointmentsService,
    private router : Router
  ) { }

  ngOnInit(): void {
  this.loadUsersAppointments();
  }
  loadUsersAppointments(){
    this.appointmentsService.find().subscribe(res=> {
      if(res.length == 0){
        alert("neautorizovan");
      }
      this.madeAppointments = res;
    });
  }
  deleteAppointment(id : number){
    this.appointmentsService.delete(id).subscribe(res => {
      this.loadUsersAppointments();
    }) ;
   }
   redirectToUpdatePage(id : number, workdayId : number, therapistId : number){
    localStorage.setItem("appointmentToUpdate", id.toString());
    localStorage.setItem("workdayId", workdayId.toString());
    localStorage.setItem("therapistId", therapistId.toString());
    this.router.navigate(["updatemadeappointments"]);
   }


}
