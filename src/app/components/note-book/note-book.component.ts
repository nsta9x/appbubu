import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/models/word';
import { WORD_TYPE } from 'src/app/data/const';
import { NotifyService } from 'src/app/services/notify.service';
import { ActivatedRoute, Router } from '@angular/router'
import { NoteBookService } from 'src/app/services/note-book.service';
import { NoteBook } from 'src/app/models/notebook';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  notebook_id : number;
  notebook = new NoteBook;
  lstWord : Word[];
  lstWordType = WORD_TYPE;
  selectedWord : any;
  constructor(private wordService : WordService, private _ns : NotifyService, 
    private route : ActivatedRoute, private notebookService : NoteBookService, private _rt : Router) {
    this.notebook.name = "Loading...";
  }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.notebook_id = Number(params['nbId']);
      this.onDisplayNotebook();
      });
  }

  onDisplayNotebook(){
    this.wordService.getWordListByNoteBook(this.notebook_id).subscribe(data => {
      this.notebook = this.notebookService.displayNotebookDetail(data.notebook);
      this.lstWord  = this.wordService.displayListWord(data.list_word);
    });
  }

  selectWord(word: Word){
    this.wordService.getSelectedWord(word.id, this.notebook_id).subscribe(
      data => {
        this.selectedWord = this.wordService.buildWordDetail(data.word);
      }
    );
  }

  addWordToNoteBook(){
    this._rt.navigate(['/newword', this.notebook_id]);
  }
}