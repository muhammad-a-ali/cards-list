import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  /** inject the Location */
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  /** to go back to the previous page */
  goBack() {
    this.location.back();
  }

}
