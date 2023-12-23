import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, catchError, map } from 'rxjs';

import { PostHttpService } from '../post.http.service';
import { Post } from '../post.model';

export const postResolver: ResolveFn<Post | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  router: Router = inject(Router)
) => {
  return inject(PostHttpService)
    .getById(route.params['id'])
    .pipe(
      map((post) => {
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      }),
      catchError((err) => {
        console.error(err);
        router.navigate(['/']);
        return EMPTY;
      })
    );
};
