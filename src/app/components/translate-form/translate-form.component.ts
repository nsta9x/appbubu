import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'app-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.css']
})
export class TranslateFormComponent implements OnInit {
  @Input()  P_word          : Word;
  @Output() C_switchLang    : EventEmitter<number> = new EventEmitter();
  @Output() C_sendTranslate : EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeLang(langId: number){
    this.C_switchLang.emit(langId);
  }

  sendTranslate(content : string){
    this.C_sendTranslate.emit(content);
  }
}
