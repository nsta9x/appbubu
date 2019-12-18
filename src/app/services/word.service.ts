import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../models/word';
import { CONST, WORD_TYPE, LANG } from '../data/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WordService {
  private URL_GET_LIST_WORD = CONST.BASE_URL + "/notebook";
  private URL_GET_WORD      = CONST.BASE_URL + "/word";
  private URL_ADD_WORD      = CONST.BASE_URL + "/addword";
  private URL_MOD_WORD      = CONST.BASE_URL + "/modword";
  private URL_DEL_WORD      = CONST.BASE_URL + "/delword";
 
  constructor(private http: HttpClient) {}
  
  displayListWord(lw : Word[]): Word[] {
    if(lw == null || lw.length == 0) return null;
    lw.forEach(w => this.setTypeWord(w));
    return lw;
  }

  setTypeWord(w : Word){
    WORD_TYPE.forEach(function(type){
      if(type.id == w.type){
        w.typeName   = type.name;
        w.typeColor  = type.color;
        w.typeAbb    = type.abb;
      }
    });
  }

  setLangWord(w : Word){
    LANG.forEach(function(lang){
      if(lang.index == w.lang_id){
        w.lang   = lang.value;
        w.flagURL= CONST.IMG_DIR + lang.flag;
      }
    });
  }

  buildListWordTranslateAndRelate(w: Word) : Word{
    this.setTypeWord(w);
    if(w.translate){
      w.translate.forEach(w => this.setLangWord(w));
    }
    if(w.related){
      w.related.forEach(w => {this.setLangWord(w); this.setTypeWord(w);});
    }
    return w;
  }

  getCurrentWordList() : Observable<Word[]>{
    return this.http.get<Word[]>(this.URL_GET_LIST_WORD);
  }

  getSelectedWord(word : Word): Observable<Word> {
    return this.http.post<Word>(this.URL_GET_WORD, word.id);
  }
  
  saveNewWord(newWord: Word) {
    return this.http.post<Word>(this.URL_ADD_WORD, newWord);
  }

  modifyWord(modWord: Word) {
    return this.http.post<any>(this.URL_MOD_WORD, modWord);
  }

  deleteWord(wordId : any){
    return this.http.post<any>(this.URL_DEL_WORD, wordId);
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
