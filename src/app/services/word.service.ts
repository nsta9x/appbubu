import { Injectable, Sanitizer } from '@angular/core';
import { Word } from '../data/word';
import { CONST } from '../data/const';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class WordService {
  getCurrentWordList(): any {
    if(localStorage.getItem(CONST.KEY_LIST_WORD) == null || localStorage.getItem(CONST.KEY_LIST_WORD) == undefined){
      localStorage.setItem(CONST.KEY_LIST_WORD, '[]');
    }
    return JSON.parse(localStorage.getItem(CONST.KEY_LIST_WORD));
  }
  
  saveNewWord(newWord: Word) {
    let lstWord = this.getCurrentWordList();
    lstWord.push(newWord);
    localStorage.removeItem(CONST.KEY_LIST_WORD);
    localStorage.setItem(CONST.KEY_LIST_WORD, JSON.stringify(lstWord));
  }

  modifyWord(word: Word) {
    alert("This function is not available");
  }

  printWord(word: any) {
    let htmlContent = word.word + "\n" + word.wordDef;
    pdfMake.createPdf({"content": htmlContent}).download();
  }

  deleteWord(word : any){
    alert("This function is not available");
  }

  constructor() { }
}
