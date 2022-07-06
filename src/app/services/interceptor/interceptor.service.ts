import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { ModalComponent } from 'src/app/model/modal.component';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor( private _injector : Injector, private router : Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loginService = this._injector.get(LoginService);
    request = request.clone({
      setHeaders  : {
        Authorization : "Bearer " + loginService.token
      }
    });
    // return next.handle(jwtToken);
    return next.handle(request).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
          return;
          }
          if(this.router.url == "/login"){
            ModalComponent.setContent("Korisnik ne postoji, pokušajte ponovo.");
            ModalComponent.showModel();
          }
          loginService.logout();
        }
      }));
  }
}
