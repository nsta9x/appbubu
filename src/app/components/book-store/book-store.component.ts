import { Component, OnInit } from '@angular/core';
import { NoteBook } from 'src/app/models/notebook';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST } from 'src/app/data/const';
import { NoteBookService } from 'src/app/services/note-book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit {
  bookstore;
  constructor(private router: Router, private _ns : NotifyService, private noteBookService: NoteBookService) {}

  ngOnInit() {
    this.onUpdateList();
  }

  onUpdateList(){
    this.noteBookService.getBookstoreByUserId().subscribe(
      data => {
        this.bookstore = this.noteBookService.displayBookstore(data.bookstore);
      },
      error => { this._ns.ShowNotify(CONST.NOTI_ERR, "Server connection error")}
    );
  }

  selectNoteBook(nbId){
    this.router.navigate(['/notebook', nbId]);
  }
}