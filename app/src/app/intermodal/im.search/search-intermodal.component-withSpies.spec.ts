import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CountryService} from '../../services/country.service';
import {of} from 'rxjs';
import {CountryModel} from '../../model/country.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchImComponent: Simulate autocomplete for Country', () => {
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let component: SearchIntermodalComponent;

  let countryService: CountryService;
  const singleCountryStub: CountryModel[] = [new CountryModel(1, 'GERMANY', 'DE')];
  const twoCountryStub: Array<CountryModel> = [];
  twoCountryStub.push(new CountryModel(1, 'GERMANY', 'DE'), new CountryModel(2, 'FRANCE', 'FR'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule],
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService,
        {provide: ComponentFixtureAutoDetect, useValue: true}],
      // add NO_ERRORS_SCHEMA to ignore <app-result-intermodal> tag
      schemas: [NO_ERRORS_SCHEMA]

      // If you run tests in a non-CLI environment, compilationmight not have occured
    }).compileComponents();

  }));


  beforeEach(() => {
    // create component and test fixture
    // createComponent() does not bind data: use  fixture.detectChanges() to trigger this
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    countryService = fixture.debugElement.injector.get(CountryService);
  });
  it('Call CountryService#filterCountries with Jasmine Spy & fakeAsync', fakeAsync(() => {
    spyOn(countryService, 'filterCountryCode').and.returnValue(of(singleCountryStub));

    expect(countryService).toBeTruthy();
    component.filterCountries('D');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      tick(1000);
      expect(countryService.filterCountryCode).toHaveBeenCalled();
      expect(countryService.filterCountryCode).toHaveBeenCalledTimes(2);
      expect(countryService.filterCountryCode).toHaveBeenCalledWith('D');
      const countryCode = component.form.controls['country_code'];
      expect(countryCode.value).toEqual('DE');

    });
  }));

  it('Call CountryService#filterCountries with Jasmine Spy and async', async(() => {
    spyOn(countryService, 'filterCountryCode').and.returnValue(of(singleCountryStub));

    component.filterCountries('D');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(countryService.filterCountryCode).toHaveBeenCalled();
      expect(countryService.filterCountryCode).toHaveBeenCalledTimes(1);
      expect(countryService.filterCountryCode).toHaveBeenCalledWith('D');
      const countryCode = component.form.controls['country_code'];
      expect(countryCode.value).toEqual('DE');

    });
  }));
});
