import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewWordComponent } from './components/new-word/new-word.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NoteBookComponent } from './components/note-book/note-book.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { UserMainComponent } from './components/user-main/user-main.component';


const routes: Routes = [
  {path : '',                   component : MainPageComponent},
  {path : 'addword/:nbId',      component : NewWordComponent},
  {path : 'user',               component : UserMainComponent},
  {path : 'notebook/:nbId',     component : NoteBookComponent},
  {path : 'login',              component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
