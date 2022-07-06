import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITherapist } from 'src/app/interfaces/ITherapist';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class TherapistsService extends BaseService {

  constructor(private httpClient : HttpClient) { super();}
  get() : Observable<ITherapist[]>{
    return this.httpClient.get<ITherapist[]>(this.URL + "users");
  }
}
