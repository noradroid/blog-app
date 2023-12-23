import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authResolver } from './core/auth/auth-resolver/auth-resolver';
import { postResolver } from './data/post/resolver/post.resolver';
import { userResolver } from './data/user/resolver/user.resolver';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'my-page',
        loadComponent: () =>
          import('./my-page/my-page.component').then((m) => m.MyPageComponent),
      },
      {
        path: 'post/create',
        loadComponent: () =>
          import('./post/create/create.component').then(
            (m) => m.CreateComponent
          ),
        resolve: {
          user: authResolver,
        },
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./post/post-page/post-page.component').then(
            (m) => m.PostPageComponent
          ),
        resolve: {
          post: postResolver,
        },
      },
      {
        path: '',
        loadComponent: () =>
          import('./layout/box-layout/box-layout.component').then(
            (m) => m.BoxLayoutComponent
          ),
        children: [
          {
            path: 'signup',
            loadComponent: () =>
              import('./auth/sign-up/sign-up.component').then(
                (m) => m.SignUpComponent
              ),
          },
          {
            path: 'signin',
            loadComponent: () =>
              import('./auth/sign-in/sign-in.component').then(
                (m) => m.SignInComponent
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
          },
          {
            path: 'u/:username',
            loadComponent: () =>
              import('./profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
            resolve: {
              user: userResolver,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
