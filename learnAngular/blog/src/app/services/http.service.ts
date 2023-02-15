import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/Article.mode';
import { MyResponse } from '../model/MyResponse';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private api = environment.api
  private api = '/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZWx0YSIsInBhc3N3b3JkIjoiMzM2Mzc4NzU0MyIsImlhdCI6MTY2NTIwOTQzMSwiZXhwIjoxNjY1MjUyNjMxfQ.9frIIWvLznN6k9K2jxNO9V619dH9dzGhpA0meYhoRfk',
    }),
  };
  constructor(private http: HttpClient) {}

  getArticle(): Observable<MyResponse<Article[]>> {
    return this.http.get<MyResponse<Article[]>>(
      this.api + '/article/',
      this.httpOptions
    );
  }

  getArticleByPage(index: number, size: number) {
    return this.http.get(
      this.api + `/article/${index}/${size}`,
      this.httpOptions
    );
  }

  login({
    user_name,
    password,
  }: Partial<User>): Observable<MyResponse<string>> {
    return this.http.post<MyResponse<string>>(
      this.api + '/user/login',
      { user_name, password },
      this.httpOptions
    );
  }
}
