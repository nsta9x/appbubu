import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Word } from '../models/word';
import { CONST, WORD_TYPE, LANG } from '../data/const';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LanguageService } from './language.service';
import { NotifyService } from './notify.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class WordService {
  private URL_GET_LIST_WORD = CONST.BASE_URL + "/notebook";
  private URL_GET_WORD      = CONST.BASE_URL + "/word";
  private URL_ADD_WORD      = CONST.BASE_URL + "/addword";
  private URL_MOD_WORD      = CONST.BASE_URL + "/modword";
  private URL_DEL_WORD      = CONST.BASE_URL + "/delword";
  private HTTPHeader;
 
  constructor(protected http: HttpClient, private ls : LanguageService, 
    private _ns : NotifyService, private _hs: HttpService) {
    let header = new HttpHeaders({'content-type': 'application/json'});
    this.HTTPHeader = {"headers" : header};
  }
  
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

  buildListWordTranslateAndRelate(w: Word) : Word{
    this.setTypeWord(w);
    this.ls.setLangForWord(w);
    if(w.translate){
      w.translate.forEach(w => this.ls.setLangForWord(w));
    }
    if(w.related){
      w.related.forEach(w => {this.ls.setLangForWord(w); this.setTypeWord(w);});
    }
    return w;
  }

  getWordListByNoteBook(notebookid : number) : Observable<any>{
    let objReq  = {nbId : notebookid};
    return this.http.post<String>(this.URL_GET_LIST_WORD, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }

  getSelectedWord(word : Word): Observable<any> {
    let objReq = {"word_id" : word.id};
    return this.http.post<String>(this.URL_GET_WORD, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }
  
  saveNewWord(newWord: Word) {
    let req = {"word":newWord}
    return this.http.post<Word>(this.URL_ADD_WORD, JSON.stringify(req), this.HTTPHeader);
  }

  modifyWord(modWord: Word) {
    return this.http.post<any>(this.URL_MOD_WORD, modWord);
  }

  deleteWord(wordId : number){
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
