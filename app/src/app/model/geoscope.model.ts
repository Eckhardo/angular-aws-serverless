/**
 * Created by ekirschning on 27.01.2018.
 */


export class GeoScopeModel {
  private _geoscope_id?: string;
  private _country_code: string;
  private _location_code: string;
  private _geoscope_type: string;
  private _location_name: string;
  private _is_port: boolean;


  constructor(location_id: string, country_code: string, location_code: string, geoscope_type: string, location_name: string = '', port: boolean = false) {
    this._geoscope_id = location_id;
    this._location_code = location_code;
    this._geoscope_type = geoscope_type;
    this._country_code = country_code;
    this._location_name = location_name;
    this._is_port = port;
  }


  get geoscope_id(): string {
    return this._geoscope_id;
  }

  get location_code(): string {
    return this._location_code;
  }

  get geoscope_type(): string {
    return this._geoscope_type;
  }

  get country_code(): string {
    return this._country_code;
  }

  get location_name(): string {
    return this._location_name;
  }

  get is_port(): boolean {
    return this._is_port;
  }

  set geoscope_id(value: string) {
    this._geoscope_id = value;
  }

  set geoscope_type(value: string) {
    this._geoscope_type = value;
  }

  set location_code(value: string) {
    this._location_code = value;

  }

  set is_port(value: boolean) {
    this._is_port = value;
  }

  set location_name(value: string) {
    this._location_name = value;

  }

  set country_code(value: string) {
    this._country_code = value;

  }
}
