import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => { });

  describe('show', () => {

    it("Should set true value to `loading` variable", () => {
      // arrange
      service = new SpinnerService();

      // act
      service.loading = false;
      service.show();

      // assert
      expect(service.loading).toBeTruthy();
    });

  });

  describe('hide', () => {

    it("Should set false value to 'loading' variable", () => {
      // arrange
      service = new SpinnerService();

      // act
      service.loading = true;
      service.hide();

      // assert
      expect(service.loading).toBeFalsy();
    });

  });

});
