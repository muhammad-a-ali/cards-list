import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangPaginatorService extends MatPaginatorIntl {
  translations: any;

  constructor(public translate: TranslateService) {
    super();
    this.setPaginatorLabelsValues();
    this.onLangChange();
  }

  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const of: string = this.translate.instant('paginator.of');

    if (length == 0 || pageSize == 0) { return `0 ${of} ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex: number = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${of} ${length}`;
  }

  /** Override Paginator labels values */
  private setPaginatorLabelsValues(): void {
    this.itemsPerPageLabel = this.translate.instant('paginator.items_per_page');
    this.nextPageLabel = this.translate.instant('paginator.next_page');
    this.previousPageLabel = this.translate.instant('paginator.previous_page');
  }

  /** Update Paginator labels values on change lang. */
  private onLangChange() {
    this.translate.onLangChange.subscribe(() => {
      this.setPaginatorLabelsValues();
    })
  }

}
