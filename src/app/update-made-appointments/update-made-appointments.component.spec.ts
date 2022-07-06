import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMadeAppointmentsComponent } from './update-made-appointments.component';

describe('UpdateMadeAppointmentsComponent', () => {
  let component: UpdateMadeAppointmentsComponent;
  let fixture: ComponentFixture<UpdateMadeAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMadeAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMadeAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
