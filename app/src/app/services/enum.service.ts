import {Injectable} from '@angular/core';

@Injectable()
export class EnumService {

  constructor() {
  }

  public getEnumKeys(_enum: any): Array<string> {
    return Object.keys(_enum);
  }

  public getEnumValues(_enum: any): string[] {
    return Object.values(_enum);
  }

  public getKeyByValue(object: any, value: string): string {
    return Object.keys(object).find(key => object[key] === value);
  }


  public getValueByKey(object: any, key: string): any {
    return Object.values(object).find(value => value === object[key]);

  }
}
