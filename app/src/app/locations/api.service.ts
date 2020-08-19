import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {GeoScopeModel} from '../model/geoscope.model';
import {catchError, tap} from 'rxjs/operators';
import {EntityEnum} from '../enums/app-enum';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpOptionsResponse = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  observe: 'response' as 'header'
};

const main_headers = {};

const apiUrl = 'http://localhost:3000/prod';

const slash = '/';
const object_type = EntityEnum.GEOSCOPE;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }


  private getUrl(): string {
    return `${apiUrl}${slash}${object_type}${slash}`;
  }


  getLocations(): Observable<GeoScopeModel[]> {

    return this.http.get<GeoScopeModel[]>(this.getUrl())
      .pipe(
        tap(w => console.log('fetched GeoScopeModel')),
        catchError(this.handleError('getGeoScopeModel', []))
      );


  }

  getLocationByCode(code: string): Observable<GeoScopeModel> {
    console.log('api get by code:', code);
    const url = `${this.getUrl()}${code}`;
    return this.http.get<GeoScopeModel>(url).pipe(
      tap(_ => console.log(`fetched GeoScopeModel code=${_}`)),
      catchError(this.handleError<GeoScopeModel>(`getGeoScopeModelById id=${code}`))
    );
  }

  addLocation(geoscope: GeoScopeModel): Observable<GeoScopeModel> {
    return this.http.post<GeoScopeModel>(this.getUrl(), geoscope, httpOptions).pipe(
      tap((c: GeoScopeModel) => console.log(`added GeoScopeModel w/ id=${c.geoscope_id}`)),
      catchError(this.handleError<GeoScopeModel>('addGeoScopeModel'))
    );
  }


  updateLocation(code: string, geoscope: GeoScopeModel): Observable<any> {
     return this.http.put<GeoScopeModel>(this.getUrl(), geoscope, httpOptions).pipe(
      tap(_ => console.log(`updated GeoScopeModel id=${code}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  deleteLocation(code: string): Observable<GeoScopeModel> {
    const url = `${this.getUrl()}${code}`;
    return this.http.delete<GeoScopeModel>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted GeoScopeModel id=${code}`)),
      catchError(this.handleError<GeoScopeModel>('deleteLocation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  convertToModel(data: any[]) {
    const result: GeoScopeModel[] = [];
    data.forEach((value => {
      const {geoscope_id, location_name, location_code, geoscope_type, country_code, is_port} = value;
      result.push(new GeoScopeModel(geoscope_id, country_code, location_code, geoscope_type, location_name, is_port));
    }));


    return result;
  }
}
