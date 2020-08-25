import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loading: boolean = false;

  constructor() { }

  /** Sets true value to loading variable. */
  show() {
    this.loading = true;
  }

  /** Sets false value to loading variable. */
  hide() {
    this.loading = false;
  }
}
