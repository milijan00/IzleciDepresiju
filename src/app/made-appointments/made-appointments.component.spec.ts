import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadeAppointmentsComponent } from './made-appointments.component';

describe('MadeAppointmentsComponent', () => {
  let component: MadeAppointmentsComponent;
  let fixture: ComponentFixture<MadeAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadeAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadeAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
