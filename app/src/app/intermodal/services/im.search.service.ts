/**
 * Created by ekirschning on 10.04.2017.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../../enums/app-enum';
import {KeyFigureModel} from '../models/keyfigure.model';
import {Observable, of} from 'rxjs';
import {keyfigures} from '../../testdata/keyfigure';

const object_type = EntityEnum.INTERMODAL_ROUTE;
const slash = '/';
// const serverApi = 'http://localhost:3000/prod';
const serverApi= 'https://ihklqdkyme.execute-api.eu-central-1.amazonaws.com/dev';
@Injectable()
export class IntermodalSearchService {

  constructor(private http: HttpClient) {
  }


  private static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private getUrl(): string {
    return `${serverApi}${slash}${object_type}${slash}`;
  }


  getKeyFigures(imSearchModel: object): Observable<Array<any>> {
    const search_params: HttpParams = this.prepareSearchParams(imSearchModel);
    const URI = `${this.getUrl()}filter`;
    return this.http.get<Array<any>>(URI, {params: search_params});

  }

  getTestKeyFigures(imSearchModel: object): Observable<Array<any>> {

    return of(keyfigures);
  }

  private prepareSearchParams(imSearchModel: Object) {
    console.log('startDate...');
    console.log('#: ' + JSON.stringify(imSearchModel['startDate']));
    console.log('.....startDate');
    const search_params = new HttpParams()
      .set('isPreCarriage', imSearchModel['preOnCarriage'])
      .set('includeImTariff', imSearchModel['includeImTariff'])
      .set('includeImSchedule', imSearchModel['includeImSchedule'])
      .set('inlandLocation', imSearchModel['inlandLocation'])
      .set('inlandGeoScopeType', imSearchModel['inlandGeoScopeType'])
      .set('countryCode', imSearchModel['country_code'])
      .set('portLocation', imSearchModel['prefPort'])
      .set('includeAllPrefPorts', imSearchModel['includeAllPreferredPorts'])
      .set('transportMode', imSearchModel['transportMode'])
      .set('equipmentType', imSearchModel['equipmentType'])
      .set('eq20', imSearchModel['eq20'])
      .set('eq40', imSearchModel['eq40'])
      .set('eqHC', imSearchModel['eqHC'])
      .set('weight20', imSearchModel['weight20'])
      .set('weight40', imSearchModel['weight40'])
      .set('weightBasedOnly', imSearchModel['weightBasedOnly'])
      .set('startDate', imSearchModel['startDate'].toString().substring(0, 10))
      .set('endDate', imSearchModel['endDate'].toString().substring(0, 10));
    return search_params;
  }

  convertToModel(data: any[]) {
    const result: KeyFigureModel[] = [];
    if (data === undefined || data.length === 0) {
      return result;
    }

    data.forEach((value => {
      const {from_id, to_id, via_id, tpmode, rate, currency, eq_type, eq_size, preferred, start_date} = value;
      result.push(new KeyFigureModel(from_id, via_id, to_id, tpmode, preferred, eq_size, eq_type, rate, currency, start_date));
    }));


    return result;
  }


}
