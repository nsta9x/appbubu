import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/models/word';
import { FormBuilder, Validators } from '@angular/forms';
import { WordService } from 'src/app/services/word.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST, WORD_TYPE } from 'src/app/data/const';
import { Router } from '@angular/router';

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
  userId: any;
  openModify = false;
  constructor(
    private fb: FormBuilder, 
    private wordService: WordService, 
    private dialog : MatDialog, 
    private _ns:NotifyService,
    private router : Router) {}

  ngOnInit() {
    this.fb   = new FormBuilder();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.word) {
      this.modifyForm = this.fb.group({
        type: [this.word.type,   [Validators.required]],
        note: [this.word.note],
        example1: [this.word.example1],
        example2: [this.word.example2],
        example3: [this.word.example3]
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
      this.modWord            = this.modifyForm.value;
      this.modWord.content    = this.word.content;
      this.modWord.id         = this.word.id;

      this.wordService.modifyWord(this.modWord).subscribe(
        data => {
          let message = "Word " + this.modWord.content + " is modifed.";
          this._ns.ShowNotify(CONST.NOTI_OK, message);
          this.updateList.emit();
        },
        error => {
          console.log("server error");
          this._ns.ShowNotify(CONST.NOTI_ERR, "Server Error");
        }
      )
    } else {
      this._ns.ShowNotify(CONST.NOTI_ERR, "Form error.");
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
          this.wordService.deleteWord(this.word.id).subscribe(
            data => {
              let message = "Word " + this.word + " is deleted."
              this._ns.ShowNotify(CONST.NOTI_OK, message);
              this.openModify = false;
              this.updateList.emit();
            },
            error => {
              console.log("server error");
              this._ns.ShowNotify(CONST.NOTI_ERR, "Server Error");
            }
          )          
        }
      });
  }

  print(word: any){
    this.wordService.printWord(word);
  }
}