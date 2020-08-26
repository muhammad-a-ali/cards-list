import { Component, OnInit, SimpleChange, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';
import { TranslationService } from '../../services/translation.service';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  alive: boolean = true;
  isShown: boolean = true;
  pageIndex: number = 0;
  @Input() data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public translationService: TranslationService,
    private translate: TranslateService,
    private paginatorService: PaginatorService
  ) { }

  ngOnInit(): void {
    this.onLangChange();
  }

  ngOnChanges(change: SimpleChange) {
    // Get first page in paginator if data has no previous.
    if (change['data'] && !this.data.previous && this.paginator)
      this.paginator.firstPage();
  }
  p
  /**
   * Sets paginator action URL `next url` or `previous url` value.
   * @param event Event emitted when the paginator changes the page index.
   */
  pageEvent(event: PageEvent): void {
    if (event.pageIndex > event.previousPageIndex) this.paginatorService.paginatorActionURL.next(this.data.next);
    else this.paginatorService.paginatorActionURL.next(this.data.previous);
  }

  /** Reinitialize Paginato On change language. */
  private onLangChange(): void {
    this.translate.onLangChange.pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updatePageIndex();
        this.reinitPaginator();
      });
  }

  /** Update pageIndex value from pageIndex of paginator. */
  private updatePageIndex(): void {
    this.pageIndex = this.paginator.pageIndex;
  }

  /** Reinitialize Paginator to update labels values. */
  private reinitPaginator(): void {
    this.isShown = false;
    setTimeout(() => {
      this.isShown = true;
    })
  }

  /** Sets a false value to alive to stop any subscribe when component is destroyed. */
  ngOnDestroy(): void {
    this.alive = false;
  }

}
