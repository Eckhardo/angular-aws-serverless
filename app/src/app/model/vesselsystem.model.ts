export class VesselSystemModel {

  private _vs_id: number;
  private _vs_code: string
  private _vs_name: string;

  constructor(vs_id: number, vs_code: string, vs_name: string) {
    this._vs_id = vs_id;
    this._vs_code = vs_code;
    this._vs_name = vs_name;
  }

  get vs_id(): number {
    return this._vs_id;
  }

  get vs_code(): string {
    return this._vs_code;
  }

  get vs_name(): string {
    return this._vs_name;
  }
}
