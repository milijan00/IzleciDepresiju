import { Component, OnInit } from '@angular/core';
import { Therapist } from '../models/therapist';
import { TherapistsService } from '../services/therapists/therapists.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  therapists : Therapist[] = [];
  private therapistRole = 2;
  constructor(private therapistsService : TherapistsService) { }

  ngOnInit(): void {
   this.therapistsService.get().subscribe (res => this.therapists = res);
  }

}
