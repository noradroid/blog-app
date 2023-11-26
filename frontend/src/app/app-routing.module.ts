import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'post/create',
    loadComponent: () =>
      import('./post/create/create.component').then((m) => m.CreateComponent),
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
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
