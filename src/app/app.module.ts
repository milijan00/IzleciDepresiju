import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { ModalComponent } from './model/modal.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { ContactComponent } from './contact/contact.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { MakeAppointmentsComponent } from './make-appointments/make-appointments.component';
import { MadeAppointmentsComponent } from './made-appointments/made-appointments.component';
import { SubscriptionManager } from './services/subscriptionManager';
import { CommonModule } from '@angular/common';
import { UpdateMadeAppointmentsComponent } from './update-made-appointments/update-made-appointments.component';
import { AuthIntersectorService } from './services/authIntersector/auth-intersector.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    FaqComponent,
    AboutusComponent,
    LoginComponent,
    RegistrationComponent,
    ValidationMessageComponent,
    ModalComponent,
    ContactComponent,
    AppointmentsComponent,
    MakeAppointmentsComponent,
    MadeAppointmentsComponent,
    UpdateMadeAppointmentsComponent
  ],
  imports: [
    // CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component : HomeComponent
      },
      {
        path : "faq",
        component : FaqComponent
      },
      {
        path : "aboutus",
        component : AboutusComponent
      },
      {
        path : "login",
        component  : LoginComponent
      },
      {
        path : "registration",
        component : RegistrationComponent
      },
      {
        path : "contact",
        component : ContactComponent
      },
      {
        path : "appointments",
        component : AppointmentsComponent,
      },{
        path : "makeappointments",
        component : MakeAppointmentsComponent,
        canActivate : [AuthGuard]
      },
      {
        path : "madeappointments",
        component : MadeAppointmentsComponent,
        canActivate : [AuthGuard]
      },
      {
        path : "updatemadeappointments",
        component : UpdateMadeAppointmentsComponent,
        canActivate : [AuthGuard]
      }
    ]) 
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass : InterceptorService, multi:true}, SubscriptionManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class AppRoutingModule { }