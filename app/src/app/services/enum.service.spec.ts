import {inject, TestBed} from '@angular/core/testing';

import {EnumService} from './enum.service';
import {GeoScopeType} from '../enums/geoscope.type';
import {IntermodalMode} from '../enums/intermodal.transport.mode';

describe('EnumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumService]
    });
  });

  it('should be created', inject([EnumService], (service: EnumService) => {
    expect(service).toBeTruthy();
  }));


  it('should read geo scope type LOCATION', inject([EnumService], (service: EnumService) => {
    let geoScopeType: string = service.getKeyByValue(GeoScopeType, 'L');
    expect(geoScopeType).toEqual('LOCATION');
  }));


  it('should read transport mode type BARGE/ROAD', inject([EnumService], (service: EnumService) => {
    let tpMode: string = service.getValueByKey(IntermodalMode, 'BARGE_ROAD');
    expect(tpMode).toEqual('BARGE/ROAD');
  }));
});
