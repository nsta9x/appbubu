import { Component, OnInit } from '@angular/core';
import { NoteBook } from 'src/app/models/notebook';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST } from 'src/app/data/const';
import { NoteBookService } from 'src/app/services/note-book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {
  listNoteBook : NoteBook[];
  constructor(private router: Router, private _ns : NotifyService, private noteBookService: NoteBookService) { 
    this.listNoteBook 
  }

  ngOnInit() {
    this.onUpdateList();
  }

  onUpdateList(){
    this.noteBookService.getNoteBookList().subscribe(
      data => {
        this.listNoteBook = this.noteBookService.displayListNoteBook(data);
      },
      error => { this._ns.ShowNotify(CONST.NOTI_ERR, "Server connection error")}
    );
  }

  selectNoteBook(nbId){
    this.router.navigate(['/notebook', nbId]);
  }
}
