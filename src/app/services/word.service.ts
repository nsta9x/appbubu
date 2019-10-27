import { Injectable, Sanitizer } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  saveNewWord(newWord: any) {
    let htmlContent = newWord.word + "\n" + newWord.wordDef;
    return { content: htmlContent };
  }

  constructor() { }
}
