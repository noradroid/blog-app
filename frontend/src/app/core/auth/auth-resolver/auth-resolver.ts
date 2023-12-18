import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NEVER, of, switchMap } from 'rxjs';

import { User } from 'src/app/data/user/user.model';
import { AuthService } from '../auth.service';

export const authResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthService).user$.pipe(
    switchMap((user) => {
      if (user) {
        return of(user);
      } else {
        inject(Router).navigate(['/']);
        return NEVER;
      }
    })
  );
};
