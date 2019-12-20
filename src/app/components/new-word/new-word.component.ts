import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { Router, ActivatedRoute } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST, WORD_TYPE, LANG } from 'src/app/data/const';
import { Word } from 'src/app/models/word';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  newWordForm;
  noteBookId;
  lstType = WORD_TYPE;
  lstTranslateLang = 
  [
        { id : 2, value : "FR", flag : "/FR.png" },
        { id : 3, value : "VN", flag : "/VN.png" },
  ];
  lstTranslateWord:Array<Object> = [];
  translateWord : Word;

  constructor(private fb: FormBuilder, private wordService: WordService,
    private _ns: NotifyService, private router: Router, private route : ActivatedRoute) {

    this.newWordForm = this.fb.group({
      content: ["", [Validators.required]],
      type: [this.lstType[0].id, [Validators.required]],
      note: "",
      example1: "",
      example2: "",
      example3: ""
    });
    this.translateWord = this.initTranslateWord(0);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.noteBookId = params['nbId'];
    });
   }

  initTranslateWord(indexL: number): Word {
    let w = new Word();
    w.lang = this.lstTranslateLang[indexL].value;
    w.lang_id = this.lstTranslateLang[indexL].id;
    w.flagURL = CONST.IMG_DIR + this.lstTranslateLang[indexL].flag;
    return w;
  }

  prepareTranslateWord(){
    let w = new Word();
    w.id = -1;
    w.content = this.translateWord.content;
    w.lang_id = this.translateWord.lang_id;
    this.lstTranslateWord.push(w);
  }

  onSubmit() {
    this.prepareTranslateWord();
    let newWord = this.newWordForm.value;
    newWord.translate = this.lstTranslateWord;
    newWord.lang_id = 0;
    newWord.notebook_id = this.noteBookId;
    this.wordService.saveNewWord(newWord).subscribe(
      data => {
        console.log("New word Saved");
        this._ns.ShowNotify(CONST.NOTI_OK, "New word saved to notebook.");
        this.router.navigate(['/notebook/'+ this.noteBookId]);
      },
      error => {
        console.log("server error");
        this._ns.ShowNotify(CONST.NOTI_ERR, "Server Error");
      }
    )
  }

  onSwitchLang(langId : number){
    let newLangIndex = 0;
    let index = this.lstTranslateLang.findIndex(l => l.id == langId);
    if(!isNullOrUndefined(this.lstTranslateLang[index + 1])){
      newLangIndex = index + 1;
    }
    this.translateWord = this.initTranslateWord(newLangIndex);
  }

  onSendTranslate(content : string){
    this.translateWord.content = content;
  }
}
