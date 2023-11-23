import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostHttpService } from 'src/app/data/post/post.http.service';
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { EditorModule } from 'src/app/shared/editor/editor.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, EditorModule, ActionButtonComponent, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  content = '';

  service = inject(PostHttpService);

  router = inject(Router);

  submit(): void {
    this.service
      .create({
        title: 'I forgot to create the title field 1',
        content: this.content,
        userId: 1,
      })
      .subscribe();

    this.router.navigate(['/']);
  }
}
