import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/models/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import {MatSelectModule} from '@angular/material/select';
import { WORD_TYPE } from 'src/app/models/word.type';
import { CONST } from 'src/app/data/const';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord : Word[];
  lstWordType = WORD_TYPE;
  selectedWord : any;
  userId;
  selectedBox;
  countdown;  
  wordValid;
  constructor(private wordService : WordService) {}

  ngOnInit() { 
    this.onUpdateList();
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  onUpdateList(){
    this.wordService.getCurrentWordList().subscribe(data => {
      this.lstWord = this.wordService.displayListWord(data);
      console.log(this.lstWord);
    });
  }
}