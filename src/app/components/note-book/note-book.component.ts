import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/models/word';
import { CONST, WORD_TYPE } from 'src/app/data/const';
import { NotifyService } from 'src/app/services/notify.service';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  noteBookId;
  lstWord : Word[];
  lstWordType = WORD_TYPE;
  selectedWord : any;
  constructor(private wordService : WordService, private _ns : NotifyService, private route : ActivatedRoute) {}

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.noteBookId = params['nbId'];
      this.onUpdateList(this.noteBookId);
      });
  }

  selectWord(word: Word){
    this.wordService.getSelectedWord(word).subscribe(
      data => {
        this.selectedWord = this.wordService.buildListWordTranslateAndRelate(data.word);
      }
    );
  }

  onUpdateList(nbId : number){
    this.wordService.getWordListByNoteBook(nbId).subscribe(data => {
      this.lstWord = this.wordService.displayListWord(data.listWord);
    });
  }
}