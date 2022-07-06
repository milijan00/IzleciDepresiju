import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  static content : string = "";
  static displayClass : string = "d-none";
  // model = {
  //   content : "",
  //   displayClass : "d-flex",
  //   show : function(){
  //     this.displayClass = "d-flex";
  //   }  ,
  //   hide : function(){
  //     this.displayClass = "d-none";
  //   }

  // }
  ngOnInit(): void {
    // document.getElementById("")
  }
  get display(){
    return ModalComponent.displayClass;
  }
  get modalContent(){
    return ModalComponent.content;
  }
  static showModel() : void{
    ModalComponent.displayClass = "d-flex";
  }
  hideModel() : void{
    ModalComponent.displayClass = "d-none";
  }
  static setContent(content: string) : void{
    ModalComponent.content = content;
  }
}
