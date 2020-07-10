export class ContractModel {
  private _no: string;
  private _type: string;
  private _valid_from: Date;
  private _valid_to: Date;
  private _ref_no: string;


  constructor(no: string, type: string, valid_from: Date, valid_to: Date, ref_no: string) {
    this._no = no;
    this._type = type;
    this._valid_from = valid_from;
    this._valid_to = valid_to;
    this._ref_no = ref_no;
  }

  get no(): string {
    return this._no;
  }

  get type(): string {
    return this._type;
  }

  get valid_from(): Date {
    return this._valid_from;
  }

  get valid_to(): Date {
    return this._valid_to;
  }

  get ref_no(): string {
    return this._ref_no;
  }
}
