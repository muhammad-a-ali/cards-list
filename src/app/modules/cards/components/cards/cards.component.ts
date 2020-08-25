import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { takeWhile, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  alive: boolean = true;
  searchValue: string = '';
  peopleData: any;
  peopleList: any[] = [];

  constructor(private apiRequestService: ApiRequestService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    // Get all people list
    this.getPeopleList('');
  }

  ngAfterViewInit(): void {
    this.searchForPeople();
  }

  /** Reset searchValue variable and get all people list on clear search input. */
  onClearSearchInput(): void {
    this.searchValue = '';
    this.getPeopleList('');
  }

  /**
   * Gets search and page params, then gets the people list that matching with these params.
   * @param url The paginator action URL `next url` or `previous url`.
   */
  getUrlParams(url: string): void {
    if (!url) return;
    const params: string[] = url.split('?')[1].split('&');
    const search: string = params[0].split('=')[1];
    const page: string = params[1].split('=')[1];
    this.getPeopleList(search, page);
  }

  /** Search for people on fire Keyup event. */
  private searchForPeople(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // Only subscribe if alive boolean is true
      takeWhile(() => this.alive),
      // Get search input value
      map((event: any) => {
        return event.target.value;
      }),
      // Wait 500ms after the last event before emitting last event
      debounceTime(500),
      // Only emit if value is different from previous value   
      distinctUntilChanged()
      // Get new people list on emit new search input value
    ).subscribe(_ => this.getPeopleList());
  }

  /**
   * Retrevies people list from api.
   * @param search The search value to filter the people.
   * @param page Additional param for the pagination.
   */
  private getPeopleList(search: string = this.searchValue, page?: string): void {
    let params: any;
    if (!page) params = { search: search };
    else params = { search: search, page: page };
    this.apiRequestService.get(params).pipe(takeWhile(() => this.alive))
      .subscribe((response: any) => {
        this.setPeopleData(response);
        if (response) this.checkDataAvailability(response.results);
      }, error => {
        this.snackBarService.openSnackBar(error, 'Error');
      })
  }

  /**
   * Sets value to peopleData variable.
   * @param data The api response data.
   */
  private setPeopleData(data: any): void {
    this.peopleData = data;
  }

  /**
   * Notifiy `No data` info if people list is empty.
   * @param peopleList The people data list.
   */
  private checkDataAvailability(peopleList: any[]): void {
    if (peopleList && peopleList.length === 0)
      this.snackBarService.openSnackBar('No data', 'People');
  }

  /** Sets a false value to alive to stop any subscribe when component is destroyed. */
  ngOnDestroy(): void {
    this.alive = false;
  }
}
