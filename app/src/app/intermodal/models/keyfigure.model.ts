/**
 * Created by ekirschning on 27.02.2018.
 */
import {GeoScopeModel} from '../../model/geoscope.model';


export class KeyFigureModel {
  private _from: GeoScopeModel;
  private _via: GeoScopeModel;

  private _to: GeoScopeModel;

  private _transportMode: string;
  private _isPreferred: boolean;

  private _equipmentSize: string;

  private _equipmentGroup: string;

  private _rate: number;

  private _currency: string; // nullable


  private _startDate: Date;


  constructor(from: GeoScopeModel, via: GeoScopeModel, to: GeoScopeModel, transportMode: string, isPreferred: boolean, equipmentSize: string, equipmentGroup: string, rate: number, currency: string, startDate: Date) {
    this._from = from;
    this._via = via;
    this._to = to;
    this._transportMode = transportMode;
    this._isPreferred = isPreferred;
    this._equipmentSize = equipmentSize;
    this._equipmentGroup = equipmentGroup;
    this._rate = rate;
    this._currency = currency;
    this._startDate = startDate;
  }

  get from(): GeoScopeModel {
    return this._from;
  }

  get via(): GeoScopeModel {
    return this._via;
  }

  get to(): GeoScopeModel {
    return this._to;
  }


  get transportMode(): string {
    return this._transportMode;
  }


  get isPreferred(): boolean {
    return this._isPreferred;
  }

  get equipmentSize(): string {
    return this._equipmentSize;
  }

  get equipmentGroup(): string {
    return this._equipmentGroup;
  }

  get rate(): number {
    return this._rate;
  }

  get currency(): string {
    return this._currency;
  }


  get startDate(): Date {
    return this._startDate;
  }

}
