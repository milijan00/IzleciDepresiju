import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFaq } from 'src/app/interfaces/IFaq';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private httpClient : HttpClient) { }
  get() : Observable<IFaq[]>{
    return this.httpClient.get<IFaq[]> ("assets/jsondata/faqs.json");
  }
}
