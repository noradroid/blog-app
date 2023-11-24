import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpConnectionErrorComponent } from './http-connection-error.component';

@Directive({
  selector: '[appHttpConnectionError]',
  standalone: true,
})
export class HttpConnectionErrorDirective implements OnInit, OnDestroy {
  @Input() appHttpConnectionError!: Observable<any>;
  subscription!: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private _vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.appHttpConnectionError.subscribe({
      next: (val) => {
        this._vcr.createEmbeddedView(this.templateRef);
      },
      error: (err) => {
        if (err.status === 0) {
          this._vcr.clear();
          this._vcr.createComponent(HttpConnectionErrorComponent);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
