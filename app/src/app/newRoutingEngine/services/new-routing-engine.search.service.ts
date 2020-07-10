/**
 * Created by ekirschning on 10.04.2017.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';
import {EntityEnum} from '../../enums/app-enum';
import {NewRoutingModel} from '../models/nre.model';


@Injectable()
export class NewRoutesSearchService {
  private serverApi = ConfigService.get('tomcat');
  private resource = '/';
  private objectType = EntityEnum.ROUTING_RESULT;

  constructor(private http: HttpClient) {
  }


  private static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }


  private getUrl(): string {
    return this.serverApi + this.resource + this.objectType + this.resource;
  }

  getRoutings(imSearchModel: object): Observable<Array<NewRoutingModel>> {
    console.log('search model:' + JSON.stringify(imSearchModel));
    console.log('typeof:' + typeof imSearchModel);
    const search_params: HttpParams = this.prepareSearchParams(imSearchModel);

    const URI = this.getUrl() + 'filter/';
    return this.http.get<Array<NewRoutingModel>>(URI, {params: search_params});

  }

  private prepareSearchParams(imSearchModel: Object) {
    const search_params = new HttpParams()
      .set('includeInvalid', imSearchModel['includeInvalid'])
      .set('includeShunting', imSearchModel['includeShunting'])
      .set('numberTs', imSearchModel['numberTs'])
      .set('pol', imSearchModel['portOfLoading'])
      .set('pod', imSearchModel['portOfDestination'])
      .set('trade', imSearchModel['trade'])
      .set('ts1', imSearchModel['ts_1'])
      .set('ts2', imSearchModel['ts_2'])
      .set('ts3', imSearchModel['ts_3'])
      .set('startDate', imSearchModel['startDate'].toString().substring(0, 10))
      .set('endDate', imSearchModel['endDate'].toString().substring(0, 10));
    return search_params;
  }

}
