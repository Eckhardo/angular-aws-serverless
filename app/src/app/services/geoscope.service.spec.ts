import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GeoScopeService} from './geoscope.service';
import {GeoScopeModel} from '../model/geoscope.model';
import {EntityEnum} from '../enums/app-enum';

describe('GeoScopeService', () => {
  let injector;
  let geoScopeService: GeoScopeService;
  let httpMock: HttpTestingController;
  const expectedData: GeoScopeModel[] = [
    new GeoScopeModel(2, '', 'DEHAM', ''),
    new GeoScopeModel(1, '', 'BEANR', '')
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeoScopeService]
    });
    injector = getTestBed();
    geoScopeService = injector.get(GeoScopeService);
    httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('Should call Service##filterPorts', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {


      geoScopeService.filterPorts('DEHAM').subscribe(data => {
        expect(data.length).toBe(2);
        expect(data).toEqual(expectedData);
      });

      const req = httpMock.expectOne(`${geoScopeService.serverApi}/${EntityEnum.PORTS}/filter/?location_code=DEHAM`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedData);
    });
  });

  describe('Should call Service#filterLocations', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {
      geoScopeService.filterLocations('DEHAM', 'L', 'DE').subscribe(data => {
        expect(data.length).toBe(2);
        expect(data).toEqual(expectedData);
      });
      const req = httpMock.expectOne(`${geoScopeService.serverApi}/${EntityEnum.GEOSCOPE}/filter/?location_code=DEHAM&geo_scope_type=L&country_code=DE`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedData);
    });

  });

});
