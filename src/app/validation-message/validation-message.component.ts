import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() control : AbstractControl  = new FormControl();
  @Input() message  :string = "";
  @Input() validator : string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
