import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../enums/app-enum';
import {GeoScopeModel} from '../model/geoscope.model';

import {VesselSystemModel} from '../model/vesselsystem.model';
import {TradeModel} from '../model/trade.model';
import {ContractModel} from '../model/contract.model';

const object_type = EntityEnum.GEOSCOPE;
const slash = '/';
// const serverApi = 'http://localhost:3000/prod';

/**
 * Created by ekirschning on 28.03.2017.
 */

@Injectable()
export class GeoScopeService {
  locations: Array<GeoScopeModel> = [];
  prefPorts: Array<GeoScopeModel> = [];
  // readonly serverApi = `http://${location.host}/nre`;
  private slash = '/';

  constructor(private http: HttpClient) {
  }

  public static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private getUrl(): string {
    return `${serverApi}${slash}${object_type}${slash}`;
  }


  private getUrlWithType(object_type: string): string {
    return `${serverApi}${slash}${object_type}${slash}`;
  }

  filterLocations(locationCode: string, geoScopeType: string, countryCode: string): Observable<Array<GeoScopeModel>> {
    const search_params: HttpParams = this.prepareGeoScopeSearchParams(locationCode, geoScopeType, countryCode);
    const URI = `${this.getUrl()}filter`;
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params}).pipe(
        catchError(this._handleError));
  }


  filterPreferredPorts(code: string, geoScopeType: string, countryCode: string): Observable<Array<GeoScopeModel>> {
    console.log('filterPreferredPorts:: start');
    const search_params: HttpParams = this.prepareGeoScopeSearchParams(code, geoScopeType, countryCode);
    const URI = `${this.getUrl()}preferredPorts`;
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  filterPorts(code: string): Observable<Array<GeoScopeModel>> {
    const search_params = new HttpParams().set('location_code', code.toUpperCase());
    const URI = `${this.getUrl()}ports`;
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  prepareGeoScopeSearchParams(code: string, geoScopeType: string, countryCode: string) {
    const search_params = new HttpParams()
      .set('location_code', code.toUpperCase())
      .set('geoscope_type', geoScopeType.toUpperCase())
      .set('country_code', countryCode);
    return search_params;
  }


  filterContracts(query: string): Observable<Array<ContractModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('contract_no', query.toUpperCase());
    const URI = this.getUrlWithType(EntityEnum.CONTRACT) + 'filter/';

    return this.http
      .get<Array<ContractModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  filterContractGroups(query: string): Observable<Array<ContractModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('contract_no', query.toUpperCase());
    const URI = this.getUrlWithType(EntityEnum.CONTRACT_GROUP) + 'filter/';

    return this.http
      .get<Array<ContractModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }


  filterTrades(query: string): Observable<Array<TradeModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('trade_code', query.toUpperCase());
    const URI = this.getUrlWithType(EntityEnum.TRADE) + 'filter/';

    return this.http
      .get<Array<TradeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  convertToModel(data: any[]) {
    const result: GeoScopeModel[] = [];
    if (data === undefined || data.length === 0) {
      return result;
    }

    data.forEach((value => {
      const {geoscope_id, location_name, location_code, geoscope_type, country_code, is_port} = value;
      result.push(new GeoScopeModel(geoscope_id, country_code, location_code, geoscope_type, location_name, is_port));
    }));

    return result;
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return observableThrowError(errorMsg);
  }

  // dummy methods

  findLocationsMock(): Observable<Array<GeoScopeModel>> {
    return of(this.buildLocations());
  }

  private buildLocations(geoScope?: GeoScopeModel) {
    const geoScopes: Array<GeoScopeModel> = [];
    geoScopes.push(new GeoScopeModel('1', 'DE', 'DEHAM', 'L'));
    geoScopes.push(new GeoScopeModel('2', 'DE', 'DEBRV', 'L'));
    geoScopes.push(new GeoScopeModel('3', 'NL', 'NLRTM', 'L'));
    geoScopes.push(new GeoScopeModel('4', 'BE', 'BEANR', 'L'));

    geoScopes.push(new GeoScopeModel('5', 'DE', 'DUSSELDORF', 'T'));
    geoScopes.push(new GeoScopeModel('6', 'DE', 'DUSHEIM', 'T'));
    geoScopes.push(new GeoScopeModel('7', 'DE', 'DUSENHAUSEN', 'T'));
    geoScopes.push(new GeoScopeModel('8', 'DE', 'DEDUS', 'L'));
    geoScopes.push(new GeoScopeModel('9', 'DE', 'DEDUI', 'L'));
    if (geoScope !== undefined) {
      geoScopes.push(geoScope);
    }
    return geoScopes;
  }

  saveLocationMock(geoScope: GeoScopeModel) {
    this.buildLocations(geoScope);


  }

  filterPortLocations(query: string): Observable<Array<GeoScopeModel>> {
    console.log('service: filter is_port GEOSCOPE_TEST_DATA:' + query);
    this.prefPorts = [];
    this.prefPorts.push(new GeoScopeModel('1', 'DE', 'DEHAM', 'L'));
    this.prefPorts.push(new GeoScopeModel('2', 'DE', 'DEBRV', 'L'));
    this.prefPorts.push(new GeoScopeModel('3', 'NL', 'NLRTM', 'L'));
    this.prefPorts.push(new GeoScopeModel('4', 'BE', 'BEANR', 'L'));

    return of(this.prefPorts);
  }

  filterPodLocations(query: string): Observable<Array<GeoScopeModel>> {
    console.log('service: filter is_port GEOSCOPE_TEST_DATA:' + query);
    this.prefPorts = [];
    this.prefPorts.push(new GeoScopeModel('1', '', 'BRSSZ', ''));
    this.prefPorts.push(new GeoScopeModel('2', '', 'BRMAO', ''));
    this.prefPorts.push(new GeoScopeModel('3', '', 'BRSUA', ''));
    this.prefPorts.push(new GeoScopeModel('4', '', 'BRITA', ''));
    return of(this.prefPorts);
  }


  filterVS(query: string): Observable<VesselSystemModel[]> {
    const vs: Array<VesselSystemModel> = [];
    return of(vs);
  }

}
