import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewWordComponent } from './components/new-word/new-word.component';
import { MainPageComponent } from './components/main-page/main-page.component';


const routes: Routes = [
  {path : '',                   component : MainPageComponent},
  {path : 'addword',            component : NewWordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
