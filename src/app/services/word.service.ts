import { Injectable, Sanitizer } from '@angular/core';
import { Word } from '../data/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  saveNewWord(newWord: Word) {
    let htmlContent = newWord.word + "\n" + newWord.wordDef;
    return { content: htmlContent };
  }

  modifyWord(word: Word) {
    alert("This function is not available");
    return word;
  }

  constructor() { }
}
