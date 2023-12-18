import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from 'src/app/core/config/app.config';
import { PostRequestDto } from './dto/post-request.model';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  private ENDPOINT = URL.concat('/posts');

  constructor(private http: HttpClient) {}

  create(model: PostRequestDto): Observable<Post> {
    return this.http.post<Post>(this.ENDPOINT, model);
  }

  update(id: number, model: PostRequestDto): Observable<Post> {
    return this.http.put<Post>(
      this.ENDPOINT.concat('/').concat(String(id)),
      model
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.ENDPOINT.concat('/').concat(String(id)));
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.ENDPOINT);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(this.ENDPOINT.concat('/').concat(String(id)));
  }

  getAllByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.ENDPOINT.concat(`?user=${id}`));
  }
}
