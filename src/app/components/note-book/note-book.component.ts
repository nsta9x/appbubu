import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/models/word';
import { CONST, WORD_TYPE } from 'src/app/data/const';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord : Word[];
  lstWordType = WORD_TYPE;
  selectedWord : any;
  constructor(private wordService : WordService, private _ns : NotifyService) {}

  ngOnInit() { 
    this.onUpdateList();
  }

  selectWord(word: Word){
    this.wordService.getSelectedWord(word).subscribe(
      data => {
        console.log(word);
        this.selectedWord = this.wordService.buildListWordTranslateAndRelate(data)
      },
      error => { this._ns.ShowNotify(CONST.NOTI_ERR, "Server connection error")}
    );
  }

  onUpdateList(){
    this.wordService.getCurrentWordList().subscribe(
      data => {
        this.lstWord = this.wordService.displayListWord(data);
      },
      error => { this._ns.ShowNotify(CONST.NOTI_ERR, "Server connection error")}
    );
  }
}