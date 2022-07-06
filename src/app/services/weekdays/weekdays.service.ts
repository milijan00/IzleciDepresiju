import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeekday } from 'src/app/interfaces/IWeekday';
import { IWorkday } from 'src/app/interfaces/IWorkday';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class WeekdaysService  extends BaseService{

  constructor(private http : HttpClient) { super();}

  get() : Observable<IWorkday[]>{
    return this.http.get<IWorkday[]>(this.URL + "workdays");
  }
  getWorkdaysOfTherapist(id : string):Observable<IWorkday[]>{
    return this.http.get<IWorkday[]>(this.URL + "workdays/" + id);
  }
}
