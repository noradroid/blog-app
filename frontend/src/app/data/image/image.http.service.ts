import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageHttpService {
  constructor(private http: HttpClient) {}

  get(): Observable<HttpResponse<Blob>> {
    return this.http.get('https://picsum.photos/300/200', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  post(file: Blob): Observable<void> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<void>(
      'http://localhost:8080/api/v1/posts/image',
      form
    );
  }
}
