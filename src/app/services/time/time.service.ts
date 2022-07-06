import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITime } from 'src/app/interfaces/ITime';
import { ITimesForChosenTherapistAndWorkday } from 'src/app/interfaces/ITimesForChosenTherapistAndWorkday';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class TimeService  extends BaseService{

  constructor(private http : HttpClient) { super();}

  get() : Observable<ITime[]>{
    return this.http.get<ITime[]>(this.URL + "times");
  }
  find(userId : number,  workdayId : number) : Observable<ITimesForChosenTherapistAndWorkday[]>{
    return this.http.get<ITimesForChosenTherapistAndWorkday[]>(this.URL + "times/"+ userId + "/" + workdayId);
  }
}

// export interface AppointmentsForChosenTherapistAndWorkday{
//   availableAppointmentId : number,
//   timeFromValue : string,
//   timeTovalue : string
// }
