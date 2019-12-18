import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../models/word';
import { CONST } from '../data/const';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import { MaxLengthValidator } from '@angular/forms';
import { WORD_TYPE } from '../models/word.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WordService {

  private URL_GET_LIST_WORD = CONST.BASE_URL + "/notebook";
  private URL_ADD_WORD      = CONST.BASE_URL + "/addword";
  private URL_MOD_WORD      = CONST.BASE_URL + "/modword";
  private URL_DEL_WORD      = CONST.BASE_URL + "/delword";
 
  constructor(private http: HttpClient) {}
  
  displayListWord(lw : Word[]): Word[] {
    if(lw == null || lw.length == 0) return null;
    lw.forEach(w => {
      WORD_TYPE.forEach(function(type){
        if(type.id == w.type){
          w.typeName   = type.name;
          w.typeColor  = type.color;
          w.typeAbb    = type.abb;
        }
      });
    });
    return lw;
  }

  getCurrentWordList() : Observable<Word[]>{
    //localStorage.clear();
    // if(localStorage.getItem(CONST.KEY_LIST_WORD) == null || localStorage.getItem(CONST.KEY_LIST_WORD) == undefined){
    //   localStorage.setItem(CONST.KEY_LIST_WORD, '[]');
    // }
    // let listWord = JSON.parse(localStorage.getItem(CONST.KEY_LIST_WORD));
    return this.http.get<Word[]>(this.URL_GET_LIST_WORD);
  }
  
  saveNewWord(newWord: Word) {
    return this.http.post<Word>(this.URL_ADD_WORD, newWord);
  }

  modifyWord(modWord: Word) {
    //let lstWord = this.getCurrentWordList();
    // if(lstWord.length == 0) return;

    // let index = lstWord.findIndex(w => w.id == modWord.id);
    // if(index == -1) return;

    // lstWord[index] = modWord;
    // localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
    // console.log(modWord.word + " is modified.");
    return this.http.post<Word>(this.URL_MOD_WORD, modWord);
  }

  deleteWord(delWord : any){
    // let lstWord = this.getCurrentWordList();
    // if(lstWord.length == 0) return;

    // let index = lstWord.findIndex(w => w.id == delWord.id);
    // if(index == -1) return;

    // lstWord.splice(index, 1);
    // localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
    // console.log(delWord.word + " is deleted.");
  }

  printWord(word: any) {
    // html2canvas(document.getElementById('printZone')).then(function(canvas) {
    //   var img = canvas.toDataURL("image/png");
    //   var doc = new jsPDF('l', 'mm', [500, 350]);
    //   doc.addImage(img,'JPEG',5,20);
    //   let docname = word.word + ".pdf"
    //   doc.save(docname);
    //   });
  }
}
