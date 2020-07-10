import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes, AppRoutingModule} from './app-routing.module';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home/home.component';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

describe('Router tests', () => {
  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppRoutingModule
      ],
      providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
        {provide: APP_BASE_HREF, useValue: '/pagi'}
      ],
    });
  });
  // specs
  it('can navigate to home (async)', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(Router)
      .navigate(['/home'])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
      }).catch(e => console.log(e));
  }));

  it('can navigate to home (fakeAsync/tick)', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(Router).navigate(['/home']);
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/home')).toBe(true);
  }));

  it('can navigate to home (done)', done => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(Router)
      .navigate(['/home'])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
        done();
      }).catch(e => console.log(e));
  });

  it('can navigate with navigate([/])', done => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(Router)
      .navigate(['/'])
      .then(() => {
        expect(location.pathname.endsWith('/home')).toBe(true);
        done();
      }).catch(e => console.log(e));
  });
  it('can navigate with navigateUrl(/)',
    async(inject([Router, Location], (router: Router, location: Location) => {
        TestBed.createComponent(AppComponent);
        router.navigate(['/']);
        expect(location.path()).toBe('/home');
      })
    ));


  it('Should redirect unknown path (Banane) to /home',
    fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
        TestBed.createComponent(AppComponent);
        router.navigateByUrl('/Banane');

        tick();
        expect(location.path()).toBe('/home');
      })
    ));
});
