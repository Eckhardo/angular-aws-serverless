import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {INTERMODAL_ROUTES, IntermodalRoutesRoutingModule} from './im.routes-routing.module';
import {SearchIntermodalComponent} from './im.search/search-intermodal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CountryService} from '../services/country.service';
import {GeoScopeService} from '../services/geoscope.service';
import {IntermodalSearchService} from './services/im.search.service';
import {EnumService} from '../services/enum.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {appRoutes} from '../app-routing.module';
import {AppComponent} from '../app.component';
import {HomeComponent} from '../home/home/home.component';

/***
 * Imports configs for root app routing module and child module intermodal routing module:
 *<ul> Tests check that
 * <li> the child route is called precisely</li>
 * <li> the root roots are called in case that the requested child url does not match </li>
 * *</ul>
 * Root routings and child routings work hand-in-hand.
 *
 */
describe('Router tests', () => {
  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent, AppComponent, HomeComponent],
      imports: [
        RouterTestingModule.withRoutes(INTERMODAL_ROUTES),
        RouterTestingModule.withRoutes(appRoutes), BrowserAnimationsModule,
        IntermodalRoutesRoutingModule, ReactiveFormsModule, AppMaterialModule, HttpClientTestingModule
      ],

      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService, Location,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        {provide: APP_BASE_HREF, useValue: '/page'}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  // specs
  it('can navigate to searchIntermodal (async)', async(() => {
    const fixture = TestBed.createComponent(SearchIntermodalComponent);
    TestBed.inject(Router)
      .navigate(['/searchIntermodal'])
      .then(() => {
        expect(location.pathname.endsWith('/searchIntermodal')).toBe(true);
      }).catch(e => console.log(e));
  }));

  it('can navigate to searchIntermodal (fakeAsync/tick)', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearchIntermodalComponent);
    TestBed.inject(Router).navigate(['/searchIntermodal']);
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/searchIntermodal')).toBe(true);
  }));

  it('can navigate to searchIntermodal (done)', done => {
    const fixture = TestBed.createComponent(SearchIntermodalComponent);
    TestBed.inject(Router)
      .navigate(['/searchIntermodal'])
      .then(() => {
        expect(location.pathname.endsWith('/searchIntermodal')).toBe(true);
        done();
      }).catch(e => console.log(e));
  });

  it('can navigate with navigate([/])', done => {
    const fixture = TestBed.createComponent(SearchIntermodalComponent);
    TestBed.inject(Router)
      .navigate(['/searchIntermodal'])
      .then(() => {
        expect(location.pathname.endsWith('/searchIntermodal')).toBe(true);
        done();
      }).catch(e => console.log(e));
  });
  it('can navigate with navigateUrl(/)',
    async(inject([Router, Location], (router: Router, location: Location) => {
        TestBed.createComponent(SearchIntermodalComponent);
        router.navigate(['/']);
        expect(location.path()).toBe('/searchIntermodal');
      })
    ));

  it('Should redirect unknown path (Banane) to /searchIntermodal',
    fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
        TestBed.createComponent(SearchIntermodalComponent);
        router.navigateByUrl('/Banane');

        tick();
        expect(location.path()).toBe('/home');
      })
    ));
});
