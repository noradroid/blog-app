import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/data/user/user.model';
import { URL } from '../config/app.config';
import { LoginRequestDto } from './login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ENDPOINT = URL.concat('/li');
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  login(model: LoginRequestDto): Observable<User> {
    return this.http.post<User>(this.ENDPOINT, model).pipe(
      tap((user) => {
        this.user.next(user);
      })
    );
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
