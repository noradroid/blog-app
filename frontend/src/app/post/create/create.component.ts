import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PostHttpService } from 'src/app/data/post/post.http.service';
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { EditorModule } from 'src/app/shared/editor/editor.module';
import { CreateForm } from '../shared/model/create-form.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, EditorModule, ActionButtonComponent, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  model: CreateForm = {
    title: '',
    content: '',
  };

  service = inject(PostHttpService);

  router = inject(Router);

  submit(): void {
    this.service
      .create({
        ...this.model,
        userId: 1,
      })
      .subscribe();

    this.router.navigate(['/']);
  }
}
