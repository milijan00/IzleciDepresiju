import { Component, OnInit } from '@angular/core';
import { IDepressionSymptom } from '../interfaces/IDepressionSymptom';
import { DepressionSymptomsService } from '../services/depressionSymptoms/depression-symptoms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // depressionSymptoms  = [
  //   {
  //     value: "Emocionalni simptomi: depresivno raspoloženje, osećaj gubitka radosti, osećanje bezosećajnosti, ravnodušnost, anksioznost, osećaj krivice, bezvrednosti, pesimizam."
  //   },
  //   {
  //     value : "Motivacioni simptomi: kolebljivost volje (osoba ne može da donese odluku, da sprovede voljnu delatnost), psihomotorna usporenost, bezvoljnost, sniženje vitalnih dinamizama."
  //   },
  //   {
  //     value : "Kognitivni simptomi: poremećaj koncentracije, usmerenost na sebe, zaboravnost do pseudodemencije (50%), usporenost govora, doživljaj praznine u mišljenju. Mišljenje karakteriše: samoomalovažavanje, osećaj nemoći, nesposobnosti, krivice, moralnog propadanja, siromaštva, ekonomske propasti, neizlečive bolesti."
  //   },
  //   {
  //     value: "Somatski simptomi su: glavobolja, bol u leđima, stezanje u grudima, abdominalni bol, vrtoglavice, palpitacije, iscrpljenost."
  //   }

  // ];
  depressionSymptoms : IDepressionSymptom[] = [];
  constructor(private depressionSymptomsService : DepressionSymptomsService) { }

  ngOnInit(): void {
    this.depressionSymptomsService.get().subscribe(res=> this.depressionSymptoms = res);
  }

}
