import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.css'
})
export class ListArticleComponent implements OnInit {

  articles: Article[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'comprar'];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadListArticles();
  }

  loadListArticles(): void {
    this.articleService.list_articles().subscribe(
      data => {
        this.articles = data
      },
      err => {
        console.log(err);
      }
    );
  }

}
