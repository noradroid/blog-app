import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private bold = new Subject<boolean>();
  public bold$ = this.bold.asObservable();

  private italic = new Subject<boolean>();
  public italic$ = this.italic.asObservable();

  private underline = new Subject<boolean>();
  public underline$ = this.underline.asObservable();

  constructor() {}

  setBold(value: boolean): void {
    this.bold.next(value);
  }

  setItalic(value: boolean): void {
    this.italic.next(value);
  }

  setUnderline(value: boolean): void {
    this.underline.next(value);
  }
}
