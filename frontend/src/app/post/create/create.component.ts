import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonComponent } from 'shared/button/button.component';
import { PostHttpService } from 'src/app/data/post/post.http.service';
import { User } from 'src/app/data/user/user.model';
import { EditorModule } from 'src/app/shared/editor/editor.module';
import { InputComponent } from 'src/app/shared/form/fields/input/input.component';
import { CreateForm } from '../shared/model/create-form.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    EditorModule,
    ButtonComponent,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  user!: User;
  model: CreateForm = {
    title: '',
    description: '',
    content: '',
  };

  constructor(
    private service: PostHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => (this.user = data['user']));
  }

  submit(): void {
    this.service
      .create({
        ...this.model,
        userId: this.user.id,
      })
      .subscribe((post) => {
        this.router.navigate(['/post', post.id]);
      });
  }
}
