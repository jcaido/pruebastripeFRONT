import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

const ARTICLE_API = 'http://localhost:8080/api/article/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public list_articles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(ARTICLE_API + "articles", httOptions);
  }

}
