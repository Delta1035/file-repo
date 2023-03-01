import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.url;
  constructor(protected http: HttpClient) {}

  getArticle(index: number, take: number) {
    return this.http.get(this.url + '/article');
  }
}
