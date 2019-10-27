import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  matcher         = new MyErrorStateMatcher();
  wordService     = new WordService();
  wordInput       = new FormControl('', Validators.required);
  wordDef         = new FormControl('', [Validators.required, Validators.minLength(2)]);

  newwordForm = new FormGroup({
    word:     this.wordInput,
    wordDef:  this.wordDef
  });

  constructor(private router: Router, wordService: WordService) { }

  ngOnInit() {
  }

  onSubmit(){
    let newWord = this.newwordForm.value;
    let contentHtml = this.wordService.saveNewWord(newWord);
    pdfMake.createPdf(contentHtml).download();
  }
}
