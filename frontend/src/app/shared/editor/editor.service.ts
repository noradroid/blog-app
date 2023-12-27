import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormatOption, FormatOptions } from './format-options.type';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private formatOptions = FormatOptions.reduce(
    (obj: any, curr) => ((obj[curr] = new Subject<boolean>()), obj),
    {}
  );
  private formatOptions$ = FormatOptions.reduce(
    (obj: any, curr) => (
      (obj[curr] = this.formatOptions[curr].asObservable()), obj
    ),
    {}
  );

  private bold = new Subject<boolean>();
  public bold$ = this.bold.asObservable();

  private italic = new Subject<boolean>();
  public italic$ = this.italic.asObservable();

  private underline = new Subject<boolean>();
  public underline$ = this.underline.asObservable();

  private formatOption = new Subject<boolean>();
  public formatOption$ = this.formatOption.asObservable();

  constructor() {}

  get$(option: FormatOption): Observable<boolean> {
    return this.formatOptions$[option];
  }

  set(option: FormatOption, value: boolean): void {
    this.formatOptions[option].next(value);
  }

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
