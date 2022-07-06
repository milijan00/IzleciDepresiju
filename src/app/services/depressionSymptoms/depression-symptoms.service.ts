import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepressionSymptom } from 'src/app/interfaces/IDepressionSymptom';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class DepressionSymptomsService extends  BaseService {

  constructor(private httpClient : HttpClient) { super(); }
  get() : Observable<IDepressionSymptom[]>{
    return this.httpClient.get<IDepressionSymptom[]>(this.URL + "depressionSymptoms");
  }
}
