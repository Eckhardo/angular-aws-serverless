export class NewRoutingModel {

  private _tt: string;
  private _pol: string;
  private _polfac: string;
  private _ts1: string;
  private _ts1fac: string;
  private _ts2: string;
  private _ts2fac: string;
  private _ts3: string;
  private _ts3fac: string;
  private _pod: string;
  private _podfac: string;
  private _prof1: string;
  private _prof2: string;
  private _prof3: string;
  private _errors: string;


  /**
   *
   * @param {string} tt
   * @param {string} pol
   * @param {string} polfac
   * @param {string} ts1
   * @param {string} ts1fac
   * @param {string} ts2
   * @param {string} ts2fac
   * @param {string} ts3
   * @param {string} ts3fac
   * @param {string} pod
   * @param {string} podfac
   * @param {string} prof1
   * @param {string} prof2
   * @param {string} prof3
   * @param {string} errors
   */
  constructor(tt: string, pol: string, polfac: string, ts1: string, ts1fac: string, ts2: string, ts2fac: string, ts3: string, ts3fac: string, pod: string, podfac: string, prof1: string, prof2: string, prof3: string, errors: string) {
    this._tt = tt;
    this._pol = pol;
    this._polfac = polfac;
    this._ts1 = ts1;
    this._ts1fac = ts1fac;
    this._ts2 = ts2;
    this._ts2fac = ts2fac;
    this._ts3 = ts3;
    this._ts3fac = ts3fac;
    this._pod = pod;
    this._podfac = podfac;
    this._prof1 = prof1;
    this._prof2 = prof2;
    this._prof3 = prof3;
    this._errors = errors;
  }


  get tt(): string {
    return this._tt;
  }

  get pol(): string {
    return this._pol;
  }

  get polfac(): string {
    return this._polfac;
  }

  get ts1(): string {
    return this._ts1;
  }

  get ts1fac(): string {
    return this._ts1fac;
  }

  get ts2(): string {
    return this._ts2;
  }

  get ts2fac(): string {
    return this._ts2fac;
  }

  get ts3(): string {
    return this._ts3;
  }

  get ts3fac(): string {
    return this._ts3fac;
  }

  get pod(): string {
    return this._pod;
  }

  get podfac(): string {
    return this._podfac;
  }

  get prof1(): string {
    return this._prof1;
  }

  get prof2(): string {
    return this._prof2;
  }

  get prof3(): string {
    return this._prof3;
  }

  get errors(): string {
    return this._errors;
  }
}
