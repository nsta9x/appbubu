import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONST, LANG } from '../data/const';
import { Word } from '../models/word';
import { NoteBook } from '../models/notebook';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  setLangForWord(w : Word){
    LANG.forEach(function(lang){
      if(lang.id == w.lang_id){
        w.lang   = lang.value;
        w.flagURL= CONST.IMG_DIR + lang.flag;
      }
    });
  }

  setLangForNotebook(nb:NoteBook){
    LANG.forEach(function(lang){
        if(lang.id == nb.lang_id){
          nb.lang   = lang.value;
          nb.flagURL = CONST.IMG_DIR + lang.flag;
        }
      });
  }
}