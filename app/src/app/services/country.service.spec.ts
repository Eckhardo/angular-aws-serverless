import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {CountryService} from './country.service';
import {CountryModel} from '../model/country.model';
import {EntityEnum} from '../enums/app-enum';

describe('CountryService', () => {
  let countryService: CountryService;
  let httpMock: HttpTestingController;
  const testData: Array<CountryModel> = [new CountryModel(1, 'GERMANY', 'DE'), new CountryModel(2, 'FRANCE', 'FR')];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });
    // inject the service
    countryService = TestBed.get(CountryService);
    httpMock = TestBed.get(HttpTestingController);
  });


  beforeEach(inject([CountryService], s => {
    countryService = s;
  }));


  afterEach(() => {
    // Finally, assert that there are no outstanding requests.
    httpMock.verify();
  });

  // specs
  it('should return Germany country', async(() => {
    countryService.filterCountries('DE').subscribe(data => {
      // When observable resolves, result should match test data
      expect(data.length).toEqual(2);
      expect(data).toEqual(testData);

    });
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpMock.expectOne(`${countryService.serverApi}/${EntityEnum.COUNTRY}/filter/?country_code=DE`);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);
  }));

  describe('Only Check request on Servcie Side for service.filterCountries', () => {
    it('should return method,urlrepsonse type anmd params', () => {
      countryService.filterCountries('DE').subscribe();
      const call: TestRequest = httpMock.expectOne(`${countryService.serverApi}/${EntityEnum.COUNTRY}/filter/?country_code=DE`);
      expect(call.request.method).toBe('GET');
      expect(call.request.url).toBe(`${countryService.serverApi}/${EntityEnum.COUNTRY}/filter/`);
      expect(call.request.responseType).toBe('json');
      expect(call.request.params.get('country_code')).toBe('DE');

    });
  });
});
