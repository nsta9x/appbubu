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
  @Input() input_word:  any;
  @Input() notebook_id: number;
  @Output() updateList = new EventEmitter<MouseEvent>();
  listWordType = WORD_TYPE;
  modifyForm;
  modify = false;
  mod_word: Word;
  userId: any;
  selectedWord;
  constructor(
    private fb: FormBuilder, 
    private wordService: WordService, 
    private dialog : MatDialog, 
    private _ns:NotifyService,
    private router : Router) {}

  ngOnInit() {
    this.fb   = new FormBuilder();
    this.selectedWord = false;
  }

  ngOnChanges(changes : SimpleChanges){
    console.log(this.input_word);
    if(this.input_word){
      this.modifyForm = this.fb.group({
        type: [this.input_word.type,   [Validators.required]],
        note: [this.input_word.note],
        example1: [this.input_word.examples[0]],
        example2: [this.input_word.examples[1]],
        example3: [this.input_word.examples[2]],
      });
    }
  }

  closeModify(){
    this.selectedWord = false;
  }

  submitForm() {  
    if (this.modifyForm.valid) {
      this.modify = false;
      this.mod_word            = this.modifyForm.value;
      this.mod_word.content    = this.input_word.content;
      this.mod_word.id         = this.input_word.id;
      let examples = [
        this.modifyForm.value.example1, 
        this.modifyForm.value.example2, 
        this.modifyForm.value.example3]

      this.wordService.modifyWord(this.mod_word, this.notebook_id, examples).subscribe(
        data => {
          let message = "Word " + this.mod_word.content + " is modifed.";
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
          this.wordService.deleteWord(this.input_word.id).subscribe(
            data => {
              let message = "Word " + this.input_word.content + " is deleted."
              this._ns.ShowNotify(CONST.NOTI_OK, message);
              this.selectedWord = false;
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