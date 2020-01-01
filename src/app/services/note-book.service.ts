import { Injectable } from '@angular/core';
import { NoteBook } from '../models/notebook';
import { Observable } from 'rxjs';
import { CONST } from '../data/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { LanguageService } from './language.service';
import { catchError } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class NoteBookService {
  private user_id;
  private HTTPHeader;
  private URL_GET_LIST_NOTEBOOK = CONST.BASE_URL + "/bookstore";

  constructor(private http: HttpClient, private _us : UserService, private _ls : LanguageService,
    private _ns : NotifyService) {
    this.user_id = _us.validateCurrentSession();
    let header = new HttpHeaders({'content-type': 'application/json'});
    this.HTTPHeader = {"headers" : header};
  }

  displayBookstore(bookstore : NoteBook[]): NoteBook[] {
    if(bookstore == null || bookstore.length == 0) return null;
    bookstore.forEach(nb => this._ls.setLangForNotebook(nb));
    return bookstore;
  }
  
  getBookstoreByUserId() : Observable<any>{
    let objReq  = {user_id : this.user_id};
    return this.http.post<String>(this.URL_GET_LIST_NOTEBOOK, objReq, this.HTTPHeader)
    .pipe(
      catchError(error => {
        this._ns.ShowNotify(CONST.NOTI_ERR, error.message || 'Server Error');
        return null;
      }
    ));
  }

  displayNotebookDetail(notebook : NoteBook): NoteBook{
    if(notebook == null) return null;
    this._ls.setLangForNotebook(notebook);
    return notebook;
  }
}
