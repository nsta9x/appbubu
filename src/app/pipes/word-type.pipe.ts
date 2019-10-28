import { Pipe, PipeTransform } from '@angular/core';
import { Word } from '../data/word';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { WORD_TYPE } from '../data/word.type';

@Pipe({
  name: 'wordTypePipe',
  pure : false
})
export class WordTypePipe implements PipeTransform {
  constructor(private _sanitizer:DomSanitizer) {}
  transform(word: Word, args?: any): SafeHtml {
    if(word == null) return "<No Word Selected>";
    let typeWord  = '';
    let typeColor = '';
    let outputApply = '';
    WORD_TYPE.forEach(function(type){
      if(type.id == word.type){
        typeWord = type.type;
        typeColor = type.color;
        outputApply = '<p style="color:' + typeColor + ';">' + word.word + " " + typeWord + '</p>';
      }
    })
    return this._sanitizer.bypassSecurityTrustHtml(outputApply);;
  }
}