import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserHttpService } from '../user.http.service';
import { User } from '../user.model';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router = inject(Router)
) => {
  const username = route.params['username'];
  let observable: Observable<User | null>;
  if (username) {
    observable = inject(UserHttpService).getByUsername(username);
  } else {
    observable = inject(AuthService).user$;
  }
  return observable.pipe(
    map((user) => {
      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    }),
    catchError((err) => {
      console.error(err);
      router.navigate(['/']);
      return EMPTY;
    })
  );
};
