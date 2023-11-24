import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../config/app.config';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { LoginRequestDto } from './login-request.model';
import { User } from 'src/app/data/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ENDPOINT = URL.concat('/oa');
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  login(model: LoginRequestDto): Observable<void> {
    return this.http.post<void>(this.ENDPOINT, model);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) =>
        user
          ? this.http.get<boolean>(this.ENDPOINT.concat(`/${user.username}`))
          : of(false)
      )
    );
  }
}
