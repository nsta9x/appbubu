import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { Router, ActivatedRoute } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST, WORD_TYPE, LANG, ERROR_CODE } from 'src/app/data/const';
import { Word } from 'src/app/models/word';
import { isNullOrUndefined } from 'util';
import { NoteBookService } from 'src/app/services/note-book.service';
import { NoteBook } from 'src/app/models/notebook';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  newWordForm;
  notebook_id;
  lang_id;
  lstType = WORD_TYPE;
  lstTranslateLang;
  lstTranslateWord = Array<Word>();
  translateWord : Word;

  constructor(
    private _fb: FormBuilder, 
    private _ws: WordService,
    private _ns: NotifyService, 
    private _rt: Router, 
    private route : ActivatedRoute,
    private _nb : NoteBookService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.notebook_id = params['nbId'];
      this.lang_id     = params['lId'];
      
      this.lstTranslateLang = LANG.filter(
        l => { return l.id != Number(this.lang_id)}
      );

      this.newWordForm = this._fb.group({
        content: ["", [Validators.required]],
        type: [this.lstType[0].id, [Validators.required]],
        note: "",
        example1: "",
        example2: "",
        example3: ""
      });

      this.initTranslateWord();
    });
   }

  initTranslateWord() {
    this.lstTranslateLang.forEach(l => {
      let w = new Word();
      w.lang = l.value;
      w.lang_id = l.id;
      w.flagURL = CONST.IMG_DIR + l.flag;
      this.lstTranslateWord.push(w);
    });
  }

  updateTranslateContent(lang_id : number, event: any){
    this.lstTranslateWord.forEach(tw => {
      if(tw.lang_id == lang_id){
        tw.content = event.target.value;
      }
    });
  }

  onSubmit() {
    let newWord = this.newWordForm.value;
    
    newWord.translate = this.lstTranslateWord.filter(w => {
      w.type = newWord.type;
      return (w.content != null && w.content.length > 0)
    });
    newWord.lang_id = this.lang_id;
    
    let examples = [
      this.newWordForm.value.example1, 
      this.newWordForm.value.example2, 
      this.newWordForm.value.example3
    ]

    this._ws.saveNewWord(newWord, this.notebook_id, examples).subscribe(
      data => {
        console.log(data);
        if(data.RES_CODE == ERROR_CODE.ERR_WORD_EXISTED){
          this._ns.ShowNotify(CONST.NOTI_ERR, "Word existed in bookstore.");
        } else {
          this._ns.ShowNotify(CONST.NOTI_OK, "New word saved to notebook.");
          this._rt.navigate(['/notebook/'+this.notebook_id]);
        }  
      },
      error => {
        console.log("server error");
        this._ns.ShowNotify(CONST.NOTI_ERR, "Server Error");
      }
    )
  }
}
