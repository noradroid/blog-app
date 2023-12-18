import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NEVER, of, switchMap } from 'rxjs';

import { PostHttpService } from '../post.http.service';
import { Post } from '../post.model';

export const postResolver: ResolveFn<Post> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PostHttpService)
    .getById(route.params['id'])
    .pipe(
      switchMap((post) => {
        if (post) {
          return of(post);
        } else {
          inject(Router).navigate(['/']);
          return NEVER;
        }
      })
    );
};
