import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from 'src/app/core/config/app.config';
import { UserRequestDto } from './dto/user-request.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private ENDPOINT = URL.concat('/users');

  constructor(private http: HttpClient) {}

  create(model: UserRequestDto): Observable<User> {
    return this.http.post<User>(this.ENDPOINT, model);
  }

  update(id: number, model: UserRequestDto): Observable<User> {
    return this.http.put<User>(this.ENDPOINT.concat(String(id)), model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.ENDPOINT.concat(String(id)));
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.ENDPOINT);
  }
}
