export class MissingRoutingModel {
  private _pol: string;
  private _ts1: string;
  private _ts2: string;
  private _ts3: string;
  private _pod: string;
  private _trade: string;
  private _contractno: string;
  private _productno: string;
  private _partnercode: string;
  private _reasoncode: string;
  private _reason: string;


  constructor(pol: string, ts1: string, ts2: string, ts3: string, pod: string, trade: string, contractno: string, productno: string, partnercode: string, reasoncode: string, reason: string) {
    this._pol = pol;
    this._ts1 = ts1;
    this._ts2 = ts2;
    this._ts3 = ts3;
    this._pod = pod;
    this._trade = trade;
    this._contractno = contractno;
    this._productno = productno;
    this._partnercode = partnercode;
    this._reasoncode = reasoncode;
    this._reason = reason;
  }

  get pol(): string {
    return this._pol;
  }

  get ts1(): string {
    return this._ts1;
  }

  get ts2(): string {
    return this._ts2;
  }

  get ts3(): string {
    return this._ts3;
  }

  get pod(): string {
    return this._pod;
  }

  get trade(): string {
    return this._trade;
  }

  get contractno(): string {
    return this._contractno;
  }

  get productno(): string {
    return this._productno;
  }

  get partnercode(): string {
    return this._partnercode;
  }

  get reasoncode(): string {
    return this._reasoncode;
  }

  get reason(): string {
    return this._reason;
  }
}
