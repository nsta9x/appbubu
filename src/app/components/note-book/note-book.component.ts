import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/data/word';
import { WordDetailComponent } from '../word-detail/word-detail.component';
import {MatSelectModule} from '@angular/material/select';
import { WORD_TYPE } from 'src/app/data/word.type';
import { CONST } from 'src/app/data/const';

@Component({
  selector: 'app-note-book',
  templateUrl: './note-book.component.html',
  styleUrls: ['./note-book.component.css']
})
export class NoteBookComponent implements OnInit {
  lstWord = [];
  lstWordType = WORD_TYPE;
  selectedWord : any;
  userId;
  selectedBox;
  countdown;  
  wordValid;
  constructor(private serviceWord : WordService) {}

  ngOnInit() { 
    this.lstWord = this.serviceWord.getCurrentWordList();
    console.log(this.lstWord);
  }

  selectWord(word: any){
    this.selectedWord = word;
  }

  print(word: any){
    this.serviceWord.printWord(word);
  }

  onUpdateList(){
    this.lstWord = this.serviceWord.getCurrentWordList();
  }
}