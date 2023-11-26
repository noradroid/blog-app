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
      import('./layout/form-layout/form-layout.component').then(
        (m) => m.FormLayoutComponent
      ),
    children: [
      {
        path: 'signup',
        loadComponent: () =>
          import('./auth/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
