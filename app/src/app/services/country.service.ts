import {Injectable} from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../enums/app-enum';
import {CountryModel} from '../model/country.model';
import {catchError} from 'rxjs/operators';
import {GeoScopeModel} from '../model/geoscope.model';

const object_type = EntityEnum.COUNTRY;
const slash = '/';

 const serverApi = 'http://localhost:3000/prod';

@Injectable()
export class CountryService {
  countryCodes: Array<CountryModel> = [];


//  readonly serverApi = `http://${location.host}/nre`;


  constructor(private http: HttpClient) {
  }

  public static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private getUrl(): string {
    return `${serverApi}${slash}${object_type}${slash}`;
  }


  filterCountries(query: string): Observable<Array<any>> {
    const search_params: HttpParams = new HttpParams().set('country_code', query.toUpperCase());
    const URI = `${this.getUrl()}filter`;
    return this.http
      .get<Array<any>>(URI, {params: search_params}).pipe(
        catchError(this._handleError));


  }

  convertToModel(data: any[]): CountryModel [] {
    if (!data || data === undefined) {
      return data;
    }
    const result: CountryModel[] = [];
    data.forEach((value => {
      const {country_id, country_name, country_code} = value;
      result.push(new CountryModel(country_id, country_name, country_code));
    }));
    return result;
  }


  private _handleError(error: HttpErrorResponse | any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    const errorMsg = error.message || 'Error: Unable to complete request.';
    return throwError(errorMsg);


  }

  private log(message: any) {
    console.log('CountryService: ' + message);
  }

  filterCountryCode(query: string): Observable<Array<CountryModel>> {
    this.log('filter country code:' + query);
    this.countryCodes = [];
    this.countryCodes.push(new CountryModel('1', 'DK', 'DK'));
    this.countryCodes.push(new CountryModel('2', 'DE', 'DE'));
    this.countryCodes.push(new CountryModel('3', 'FR', 'FR'));
    this.countryCodes.push(new CountryModel('1', 'NL', 'NL'));
    this.countryCodes.push(new CountryModel('1', 'SE', 'SE'));
    this.countryCodes.push(new CountryModel('1', 'NO', 'NO'));
    const result: CountryModel[] = this.countryCodes.filter((countryCode) => countryCode.country_code.toLowerCase().startsWith(query.toLowerCase()));
    return of(result);

  }
}
