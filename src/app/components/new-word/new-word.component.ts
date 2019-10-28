import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { WORD_TYPE } from 'src/app/data/word.type';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  matcher         = new MyErrorStateMatcher();
  wordService     = new WordService();
  lstType         = WORD_TYPE;

  wordInput       = new FormControl('', Validators.required);
  wordDefInput    = new FormControl('', [Validators.required, Validators.minLength(2)]);
  typeInput       = new FormControl(null);

  newWordForm = new FormGroup({
    word:     this.wordInput,
    wordDef:  this.wordDefInput,
    type:     this.typeInput
  });

  constructor(private router: Router, wordService: WordService) { }

  ngOnInit() {
  }

  onSubmit(){
    let newWord = this.newWordForm.value;
    this.wordService.saveNewWord(newWord);
    this.router.navigate(['/notebook']);
  }
}
