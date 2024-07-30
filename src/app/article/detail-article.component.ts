import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { ArticleService } from './article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrl: './detail-article.component.css'
})
export class DetailArticleComponent implements OnInit {

  article?: Article;
  price: number = 0;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.articleService.detail_article(id).subscribe(
      data => {
        this.article = data;
        this.price = this.article.precio / 100;
      },
      err => {
        console.log(err);
      }
    )
  }
}
