import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { Word } from '../data/word';
import { CONST } from '../data/const';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import { MaxLengthValidator } from '@angular/forms';
import { WORD_TYPE } from '../data/word.type';

@Injectable({
  providedIn: 'root'
})

export class WordService {
  
  displayWord(word: Word): Word {
    if(word == null) return null;
    WORD_TYPE.forEach(function(type){
      if(type.id == word.type){
        word.typeName   = type.name;
        word.typeColor  = type.color;
        word.typeAbb    = type.abb;
        return word;
      }
    });
    return word;
  }

  getCurrentWordList(){
    //localStorage.clear();
    if(localStorage.getItem(CONST.KEY_LIST_WORD) == null || localStorage.getItem(CONST.KEY_LIST_WORD) == undefined){
      localStorage.setItem(CONST.KEY_LIST_WORD, '[]');
    }
    let listWord = JSON.parse(localStorage.getItem(CONST.KEY_LIST_WORD));
    listWord.forEach(w => this.displayWord(w));
    return listWord;
  }
  
  saveNewWord(newWord: Word) {
    let lstWord = this.getCurrentWordList();

    let maxId = 0;
    lstWord.map(function(w){     
      if (w.id > maxId) maxId = w.id;    
    });

    newWord.id = maxId+1;
    lstWord.push(newWord);
    localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
    console.log("New word saved : " + newWord);
  }

  modifyWord(modWord: Word) {
    let lstWord = this.getCurrentWordList();
    if(lstWord.length == 0) return;

    let index = lstWord.findIndex(w => w.id == modWord.id);
    if(index == -1) return;

    lstWord[index] = modWord;
    localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
    console.log(modWord.word + " is modified.");
  }

  deleteWord(delWord : any){
    let lstWord = this.getCurrentWordList();
    if(lstWord.length == 0) return;

    let index = lstWord.findIndex(w => w.id == delWord.id);
    if(index == -1) return;

    lstWord.splice(index, 1);
    localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
    console.log(delWord.word + " is deleted.");
  }

  printWord(word: any) {
    html2canvas(document.getElementById('printZone')).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF('l', 'mm', [500, 350]);
      doc.addImage(img,'JPEG',5,20);
      let docname = word.word + ".pdf"
      doc.save(docname);
      });
  }

  constructor() { }
}
