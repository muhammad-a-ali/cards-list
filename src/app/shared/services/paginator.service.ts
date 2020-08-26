import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  paginatorActionURL: Subject<string> = new Subject();

  constructor() { }
}
