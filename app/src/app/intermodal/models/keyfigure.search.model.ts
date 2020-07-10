export interface KeyFigureSearchModel {
  includeKeyFigure: boolean;
  includeImTariff: boolean;
  includeImSchedule: boolean;
  preOnCarriage: boolean;
  inlandLocation: string;
  countryCode: string;
  portLocation: string;
  transportMode: string;
  inlandGeoScopeType: string;
  portGeoScopeType: string;
  equipmentType: string;
  _startDate: Date;
  endDate: Date;
  eq20: boolean;
  eq40: boolean;
  eqHC: boolean;
  weight20: string;
  weight40: string;
  weightBasedOnly: string;

}
