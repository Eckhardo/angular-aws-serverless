/**
 * Created by ekirschning on 27.01.2018.
 */


export class ImLocationModel {
  private _id?: number;
  private _location_id: number;
  private _location_code: string;
  private _location_name: string;
  private _is_port: boolean;


  constructor(location_id: number, locationCode: string, location_name: string, is_port: boolean) {
    this._location_id = location_id;
    this._location_code = locationCode;
    this._location_name = location_name;
    this._is_port = is_port;
  }


  get location_id(): number {
    return this._location_id;
  }

  get locationCode(): string {
    return this._location_code;
  }

  get location_name(): string {
    return this._location_name;
  }

  get is_port(): boolean {
    return this._is_port;
  }
}
