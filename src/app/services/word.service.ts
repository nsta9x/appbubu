import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Word } from '../models/word';
import { CONST, WORD_TYPE, LANG } from '../data/const';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LanguageService } from './language.service';
import { NotifyService } from './notify.service';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class WordService {
  private URL_GET_LIST_WORD = CONST.BASE_URL + "/notebook";
  private URL_GET_WORD      = CONST.BASE_URL + "/word";
  private URL_ADD_WORD      = CONST.BASE_URL + "/newword";
  private URL_MOD_WORD      = CONST.BASE_URL + "/modword";
  private URL_DEL_WORD      = CONST.BASE_URL + "/delword";
  private HTTPHeader;
  private user_id;
 
  constructor(protected http: HttpClient, private ls : LanguageService, 
    private _ns : NotifyService, private _hs: HttpService, private userService : UserService) {
    this.user_id = userService.validateCurrentSession();
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

  buildWordDetail(w: Word) : Word{
    this.setTypeWord(w);
    this.ls.setLangForWord(w);
    if(w.translate){
      w.translate.forEach(w => this.ls.setLangForWord(w));
    }
    if(w.related){
      w.related.forEach(w => {this.ls.setLangForWord(w); this.setTypeWord(w);});
    }
    if(!w.examples){
      w.examples = [];
    }

    return w;
  }

  getWordListByNoteBook(notebook_id : number) : Observable<any>{
    let objReq  = {notebook_id : notebook_id};
    return this.http.post<String>(this.URL_GET_LIST_WORD, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }

  getSelectedWord(word_id : number, notebook_id : number): Observable<any> {
    let objReq = {word_id : word_id, notebook_id : notebook_id, user_id : this.user_id};
    return this.http.post<String>(this.URL_GET_WORD, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }
  
  saveNewWord(word: Word, notebook_id : number, examples : any) : Observable<any>{
    let objReq = {
      word        : word, 
      notebook_id : notebook_id,
      examples    : examples,
      user_id     : this.user_id
    };
    return this.http.post<Word>(this.URL_ADD_WORD, JSON.stringify(objReq), this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }

  modifyWord(word: Word, notebook_id : number, examples : any) : Observable<any> {
    let objReq = {
      word        : word, 
      notebook_id : notebook_id,
      examples    : examples,
      user_id     : this.user_id
    };
    return this.http.post<String>(this.URL_MOD_WORD, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
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
