import {FormControl, FormGroup, Validators} from '@angular/forms';

export class IntermodalSearchReactiveForm {
  private _searchIntermodalForm: FormGroup;

  constructor() {
    this._searchIntermodalForm = this.createForm();
  }

  private createForm() {
    return new FormGroup({
      includeKeyFigure: new FormControl(),
      includeImTariff: new FormControl(),
      includeImSchedule: new FormControl(),
      preOnCarriage: new FormControl('true', Validators.required),
      inlandLocation: new FormControl('', Validators.required),
      inlandGeoScopeType: new FormControl(),
      countryCode: new FormControl(''),
      transportMode: new FormControl('', Validators.required),
      prefPort: new FormControl(''),
      includeAllPreferredPorts: new FormControl(true),
      equipmentType: new FormControl('', Validators.required),
      startDate: new FormControl(new Date().toISOString(), Validators.required),
      endDate: new FormControl(new Date().toISOString()),
      eq20: new FormControl(true),
      eq40: new FormControl(true),
      eqHC: new FormControl(true),
      weight20: new FormControl(),
      weight40: new FormControl(),
      weightBasedOnly: new FormControl()

    });
  }


  get searchIntermodalForm(): FormGroup {
    return this._searchIntermodalForm;
  }

  get includeKeyFigure() {
    return this._searchIntermodalForm.get('includeKeyFigure');
  }

  get includeImTariff() {
    return this._searchIntermodalForm.get('includeImTariff');
  }


  get includeImSchdeule() {
    return this._searchIntermodalForm.get('includeImSchedule');
  }

  get preOnCarriage() {
    return this._searchIntermodalForm.get('preOnCarriage');
  }

  get inlandLocation() {
    return this._searchIntermodalForm.get('inlandLocation');
  }


  get countryCode() {
    return this._searchIntermodalForm.get('countryCode');
  }

  get prefPort() {
    return this._searchIntermodalForm.get('prefPort');
  }

  get inlandGeoScopeType() {
    return this._searchIntermodalForm.get('inlandGeoScopeType');
  }

  get includeAllPreferredPorts() {
    return this._searchIntermodalForm.get('includeAllPreferredPorts');
  }

  get eqType() {
    return this._searchIntermodalForm.get('equipmentType');
  }


  get transportMode() {
    return this._searchIntermodalForm.get('transportMode');
  }


  get startDate() {
    return this._searchIntermodalForm.get('startDate');
  }

  get endDate() {
    return this._searchIntermodalForm.get('endDate');
  }

  get eqSize20() {
    return this._searchIntermodalForm.get('eq20');
  }

  get eqSize40() {
    return this._searchIntermodalForm.get('eq40');
  }

  get weight20() {
    return this._searchIntermodalForm.get('weight20');

  }

  get weight40() {
    return this._searchIntermodalForm.get('weight40');

  }

  get weigthBasedOnly() {
    return this._searchIntermodalForm.get('weightBasedOnly');

  }

}
