import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITimeFromTo } from 'src/app/interfaces/ITimeFromTo';
import { BaseService } from '../BaseService';
// import { TimeFromTo } from 'src/app/models/timeFromTo';

@Injectable({
  providedIn: 'root'
})
export class TimesFromToService  extends BaseService{
  private url : string = "assets/jsondata/timesFromTo.json";
  constructor(private http : HttpClient) { super();}

  get() : Observable<ITimeFromTo[]>{
    return this.http.get<ITimeFromTo[]>(this.URL + "availableappointments");
  }
}
