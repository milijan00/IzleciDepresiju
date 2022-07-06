import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INavLink } from 'src/app/interfaces/INavLink';
import { BaseService } from '../BaseService';

@Injectable({
  providedIn: 'root'
})
export class NavService extends BaseService {

  constructor(private _http : HttpClient) { super(); }
  get() : Observable<INavLink[]>{
  return this._http.get<INavLink[]>(this.URL + "navigationlinks")    ;
  }
}
