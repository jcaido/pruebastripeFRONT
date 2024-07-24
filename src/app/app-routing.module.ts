import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticleComponent } from './article/list-article.component';
import { DetailArticleComponent } from './article/detail-article.component';

const routes: Routes = [
  {path: '', component: ListArticleComponent},
  {path: 'list', component: ListArticleComponent},
  {path: 'detail/:id', component: DetailArticleComponent},
  {path: '**', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
