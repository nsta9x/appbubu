import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewWordComponent } from './components/new-word/new-word.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, ShowOnDirtyErrorStateMatcher, 
  MatSelectModule, MatCardModule, MatListModule, MatRadioModule, MatDividerModule, MatProgressBarModule, ErrorStateMatcher } from '@angular/material';
import { MainPageComponent } from './components/main-page/main-page.component';
import { WordService } from './services/word.service';
import { NoteBookComponent } from './components/note-book/note-book.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NewWordComponent,
    MainPageComponent,
    NoteBookComponent,
    WordDetailComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule
  ],
  providers: [
    WordService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [ 
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
