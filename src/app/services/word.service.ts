import { Injectable, Sanitizer } from '@angular/core';
import { Word } from '../data/word';
import { CONST } from '../data/const';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MaxLengthValidator } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class WordService {
  getCurrentWordList(){
    //localStorage.clear();
    if(localStorage.getItem(CONST.KEY_LIST_WORD) == null || localStorage.getItem(CONST.KEY_LIST_WORD) == undefined){
      localStorage.setItem(CONST.KEY_LIST_WORD, '[]');
    }
    return JSON.parse(localStorage.getItem(CONST.KEY_LIST_WORD));
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
    let htmlContent = word.word + "\n" + word.wordDef;
    pdfMake.createPdf({"content": htmlContent}).download();
  }

  constructor() { }
}
