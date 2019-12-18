import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/models/word';
import { WORD_TYPE } from 'src/app/models/word.type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word: Word;
  @Output() updateList = new EventEmitter<MouseEvent>();
  listWordType = WORD_TYPE;
  modifyForm;
  modify = false;
  modWord: Word;
  hiddenMessage = true;
  fb : FormBuilder;
  userId: any;
  openModify = false;
  constructor(fb: FormBuilder, private wordService: WordService, private dialog : MatDialog) {}

  ngOnInit() {
    this.fb   = new FormBuilder();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.word) {
      this.modifyForm = this.fb.group({
        wordDef:  [this.word.def,     [Validators.required, Validators.minLength(2)]],
        wordType: [this.word.type,    [Validators.required]],
        wordNote: [this.word.note,    ]
      });
      this.checkWord();
    }
  }

  checkWord() {
    if(this.word){
      this.openModify = true;
    } else {
      this.openModify = false;
    }
  }

  closeModify(){
    this.openModify = false;
  }

  submitForm() {  
    if (this.modifyForm.valid) {
      this.modify = false;
      this.hiddenMessage      = true;
      this.modWord            = this.modifyForm.value;
      this.modWord.content    = this.word.content;
      this.modWord.id         = this.word.id;
      this.wordService.modifyWord(this.modWord);
      this.updateList.emit();
    } else {
      this.hiddenMessage = false;
    }
  }

  confirmDelete() : void {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: { 
          title: 'Confirm Delete',
          message : 'Do you want to delete this word from your notebook?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.wordService.deleteWord(this.word);
          this.openModify = false;
          this.updateList.emit();
        }
      });
  }

  print(word: any){
    this.wordService.printWord(word);
  }
}