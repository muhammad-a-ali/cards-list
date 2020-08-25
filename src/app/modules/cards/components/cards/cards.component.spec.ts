import { CardsComponent } from './cards.component';
import { Subject } from 'rxjs';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let mockApiRequestService: any;
  let mockApiSnackBarService: any;

  beforeEach(() => {
    mockApiRequestService = jasmine.createSpyObj(['get']);
    mockApiRequestService.get = new Subject<any>();
    mockApiSnackBarService = jasmine.createSpyObj(['openSnackBar']);
  });

  describe('setPeopleData', () => {

    it("Should Set `param value` to peopleData variable", () => {
      // arrange
      component = new CardsComponent(mockApiRequestService, mockApiSnackBarService);
      const data = {
        count: 82,
        next: 'http://swapi.dev/api/people/?search=&page=2',
        previous: null,
        results: []
      }
      const setPeopleDataSpy = spyOn<any>(component, 'setPeopleData').and.callThrough();

      // act
      component.peopleData = null;
      setPeopleDataSpy.call(component, data);

      // assert
      expect(component.peopleData).toEqual(data);
    });

  });


  describe('checkDataAvailability', () => {

    it("Should call openSnackBar fn with `No data, People` params if peopleList length equal 0", () => {
      // arrange
      component = new CardsComponent(mockApiRequestService, mockApiSnackBarService);
      const peopleList = [];
      const checkDataAvailabilitySpy = spyOn<any>(component, 'checkDataAvailability').and.callThrough();

      // act
      checkDataAvailabilitySpy.call(component, peopleList);

      // assert
      expect(mockApiSnackBarService.openSnackBar).toHaveBeenCalledWith('No data', 'People');
    });

  });

});
