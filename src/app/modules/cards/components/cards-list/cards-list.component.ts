import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
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

}
