import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeoscopeListComponent} from './list-component';

describe('Geoscope.List.ComponentComponent', () => {
  let component: GeoscopeListComponent;
  let fixture: ComponentFixture<GeoscopeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeoscopeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoscopeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
