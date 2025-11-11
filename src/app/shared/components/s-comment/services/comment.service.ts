import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);
  createComments(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `comments`, data);
  }
  getPostComments(idPost: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts/${idPost}/comments`);
  }
  updateComments(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `comments/664d47ffbc90df274cc45b00`, data);
  }
  deleteComments(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `comments/664d447dc99473930fa0ed94`);
  }
}
