import { CardsListComponent } from './cards-list.component';
import { PageEvent } from '@angular/material/paginator';

describe('CardsListComponent', () => {
  let component: CardsListComponent;

  beforeEach(() => { });

  describe('goToLink', () => {

    it("Should open link in a new window", () => {
      // arrange
      component = new CardsListComponent();
      spyOn(window, 'open');
      const url = "https://swapi.dev/api/people/1/";

      // act
      component.goToLink(url);

      // assert
      expect(window.open).toHaveBeenCalledWith(url);
    });

  });


  describe('getImageURL', () => {

    it("Should return male image url if the person gender is male", () => {
      // arrange
      component = new CardsListComponent();
      const imageUrl = "url(../../../../../assets/images/male.jpg)";

      // act
      const result: string = component.getImageURL('male');

      // assert
      expect(result).toBe(imageUrl);
    });

    it("Should return female image url if the person gender is female", () => {
      // arrange
      component = new CardsListComponent();
      const imageUrl = "url(../../../../../assets/images/female.jpg)";

      // act
      const result: string = component.getImageURL('female');

      // assert
      expect(result).toBe(imageUrl);
    });

    it("Should return anonymous image url if the person gender is not male and not female", () => {
      // arrange
      component = new CardsListComponent();
      const imageUrl = "url(../../../../../assets/images/anonymous.jpg)";

      // act
      const result: string = component.getImageURL('N/A');

      // assert
      expect(result).toBe(imageUrl);
    });

  });


  describe('pageEvent', () => {

    it("Should emit `next url` if pageIndex greater than previousPageIndex", () => {
      // arrange
      component = new CardsListComponent();
      spyOn<any>(component.paginatorActionURL, 'next');
      component.data = {
        count: 82,
        next: 'http://swapi.dev/api/people/?search=&page=2',
        previous: null,
        results: []
      }
      const event: PageEvent = new PageEvent();
      event.pageIndex = 1;
      event.previousPageIndex = 0;

      // act
      component.pageEvent(event);

      // assert
      expect(component.paginatorActionURL.next).toHaveBeenCalledWith(component.data.next);
    });

    it("Should emit `previous url` if pageIndex smaller than previousPageIndex", () => {
      // arrange
      component = new CardsListComponent();
      spyOn<any>(component.paginatorActionURL, 'next');
      component.data = {
        count: 82,
        next: 'http://swapi.dev/api/people/?search=&page=3',
        previous: 'http://swapi.dev/api/people/?search=&page=1',
        results: []
      }
      const event: PageEvent = new PageEvent();
      event.pageIndex = 0;
      event.previousPageIndex = 1;

      // act
      component.pageEvent(event);

      // assert
      expect(component.paginatorActionURL.next).toHaveBeenCalledWith(component.data.previous);
    });

  });

});
