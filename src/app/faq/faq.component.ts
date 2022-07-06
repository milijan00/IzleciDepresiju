import { Component, OnInit } from '@angular/core';
import { IFaq } from '../interfaces/IFaq';
import { FaqService } from '../services/faq/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs : IFaq[] = [
  ];

  constructor(private faqService : FaqService) { }

  ngOnInit(): void {
    this.faqService.get().subscribe(res => this.faqs = res);
  }

}
