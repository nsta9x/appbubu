import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewWordComponent } from './components/new-word/new-word.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NoteBookComponent } from './components/note-book/note-book.component';
import { LoginComponent } from './components/login/login.component';
import { BookStoreComponent } from './components/book-store/book-store.component';


const routes: Routes = [
  {path : '',                   component : MainPageComponent},
  {path : 'newword/:nbId/:lId', component : NewWordComponent},
  {path : 'bookstore',          component : BookStoreComponent},
  {path : 'notebook/:nbId',     component : NoteBookComponent},
  {path : 'login',              component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
