import { Injectable } from '@angular/core';
import { NoteBook } from '../models/notebook';
import { Observable } from 'rxjs';
import { CONST } from '../data/const';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class NoteBookService {
  userId;
  private URL_GET_LIST_NOTEBOOK = CONST.BASE_URL + "/notebooks";

  constructor(private http: HttpClient, private userService : UserService, private ls : LanguageService) {
    this.userId = userService.validateCurrentSession();
  }

  displayListNoteBook(lnb : NoteBook[]): NoteBook[] {
    if(lnb == null || lnb.length == 0) return null;
    lnb.forEach(nb => this.ls.setLangForNotebook(nb));
    return lnb;
  }

  getNoteBookList(): Observable<NoteBook[]> {
    return this.http.post<NoteBook[]>(this.URL_GET_LIST_NOTEBOOK, this.userId);
  }

  getCurrentWordList() {
    
  }
}
