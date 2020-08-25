import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChange } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  @Input() data: any;
  @Output() paginatorActionURL: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChange) {
    // Get first page in paginator if data has no previous.
    if (change['data'] && !this.data.previous && this.paginator)
      this.paginator.firstPage();
  }

  /**
   * Opens link in a new window.
   * @param url The URL value .
   */
  goToLink(url: string): void {
    if (!url) return;
    window.open(url);
  }

  /**
   * Returns the image URL of the card.
   * @param gender The person gender.
   */
  getImageURL(gender: string): string {
    if (gender === 'male') return 'url(../../../../../assets/images/male.jpg)';
    else if (gender === 'female') return 'url(../../../../../assets/images/female.jpg)';
    else return 'url(../../../../../assets/images/anonymous.jpg)';
  }

  /**
   * Moves an item one index in an array to another.
   * @param event Event emitted when the user drops a draggable item inside a drop container.
   */
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.data.results, event.previousIndex, event.currentIndex);
  }

  /**
   * Sets paginator action URL `next url` or `previous url` value.
   * @param event Event emitted when the paginator changes the page index.
   */
  pageEvent(event: PageEvent): void {
    if (event.pageIndex > event.previousPageIndex) this.paginatorActionURL.next(this.data.next);
    else this.paginatorActionURL.next(this.data.previous);
  }
}
