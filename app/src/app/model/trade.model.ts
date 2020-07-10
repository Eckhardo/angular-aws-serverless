export class TradeModel {
  private _id?: number;
  private _trade_name: string;
  private _trade_code: string;


  constructor(id: number, trade_name: string, trade_code: string) {
    this._id = id;
    this._trade_name = trade_name;
    this._trade_code = trade_code;
  }


  get id(): number {
    return this._id;
  }

  get trade_name(): string {
    return this._trade_name;
  }

  get trade_code(): string {
    return this._trade_code;
  }
}
