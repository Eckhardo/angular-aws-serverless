/**
 * Created by ekirschning on 10.04.2017.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';
import {EntityEnum} from '../../enums/app-enum';
import {MissingRoutingModel} from '../models/missing-routing.model';


@Injectable()
export class RoutesSearchService {
  private serverApi = ConfigService.get('tomcat');
  private resource = '/';
  private objectType = EntityEnum.MISSING_ROUTINGS;

  constructor(private http: HttpClient) {
  }


  private static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }


  private getUrl(): string {
    return this.serverApi + this.resource + this.objectType + this.resource;
  }

  getRoutings(imSearchModel: object): Observable<Array<MissingRoutingModel>> {
    console.log('search model:' + JSON.stringify(imSearchModel));
    console.log('typeof:' + typeof imSearchModel);
    const search_params: HttpParams = this.prepareSearchParams(imSearchModel);

    const URI = this.getUrl() + 'filter/';
    return this.http.get<Array<MissingRoutingModel>>(URI, {params: search_params});

  }

  private prepareSearchParams(imSearchModel: Object) {
    const search_params = new HttpParams()
      .set('pol', imSearchModel['portOfLoading'])
      .set('trade', imSearchModel['trade'])
      .set('contract', imSearchModel['contract'])
      .set('contractgroup', imSearchModel['contractGroup'])
      .set('country', imSearchModel['country_code'])
    return search_params;
  }
}
