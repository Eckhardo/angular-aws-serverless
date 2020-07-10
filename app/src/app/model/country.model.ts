export class CountryModel {
  private _country_id?: string;
  private _country_name: string;
  private _country_code: string;


  constructor(country_id: string, country_name: string, country_code: string) {
    this._country_id = country_id;
    this._country_id = country_name;
    this._country_code = country_code;
  }


  get country_id(): string {
    return this._country_id;
  }

  set country_id(value: string) {
    this._country_id = value;
  }

  get country_name(): string {
    return this._country_name;
  }

  set country_name(value: string) {
    this._country_name = value;
  }

  get country_code(): string {
    return this._country_code;
  }

  set country_code(value: string) {
    this._country_code = value;
  }
}
