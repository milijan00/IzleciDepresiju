import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppointment } from 'src/app/interfaces/IAppointment';
import { IUsersAppointments } from 'src/app/interfaces/IUsersAppointments';
import { BaseService } from '../BaseService';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends BaseService {
  constructor(private http: HttpClient, private loginService : LoginService) { super();}

  get() : Observable<IAppointment[]>{
    return this.http.get<IAppointment[]>(this.URL + "madeappointments"); 
  }
  post(id : string){
   return this.http.post(this.URL + "madeappointments", {
    "availableAppointmentId" : id
   }) ;
  }

  find() : Observable<IUsersAppointments[]>{
    return this.http.get<IUsersAppointments[]>(this.URL + "madeappointments/" + this.loginService.userId);
  }
  delete(id : number) {
    return this.http.delete(this.URL + "madeappointments/" + id);
  }
  put(id : number){
    return this.http.put(this.URL + "madeappointments", {
      "AvailableAppointmentId" : localStorage.getItem("appointmentToUpdate"),
      "NewAvailableAppointmentId" : id,
      "UserId" : this.loginService.userId
    });
  }
}


