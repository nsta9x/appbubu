import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { WORD_TYPE } from 'src/app/models/word.type';
import { NotifyService } from 'src/app/services/notify.service';
import { CONST } from 'src/app/data/const';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  matcher         = new MyErrorStateMatcher();
  lstType         = WORD_TYPE;

  W_ContentInput  = new FormControl('', Validators.required);
  W_DefInput      = new FormControl('', [Validators.required, Validators.minLength(2)]);
  W_TypeInput     = new FormControl(null);

  //TO COMPLETE
  W_NoteInput     = null;
  W_ExampleInput  = null;

  newWordForm = new FormGroup({
    content:      this.W_ContentInput,
    def:          this.W_DefInput,
    type:         this.W_TypeInput,
    //note:         this.W_NoteInput,
    //examples:     this.W_ExampleInput
  });

  constructor(private router: Router, private wordService : WordService, private _ns : NotifyService){}

  ngOnInit() {
  }

  onSubmit(){
    let newWord = this.newWordForm.value;
    this.wordService.saveNewWord(newWord).subscribe(
      data => {
        console.log("New word Saved");
        this._ns.ShowNotify(CONST.NOTI_OK, "New word saved to notebook.");
        this.router.navigate(['/notebook']);
      },
      error => {
        console.log("server error");
        this._ns.ShowNotify(CONST.NOTI_ERR, "Server Error");
      }
    )
  }
}
