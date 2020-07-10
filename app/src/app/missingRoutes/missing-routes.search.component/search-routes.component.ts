import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EnumService} from '../../services/enum.service';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {GeoScopeService} from '../../services/geoscope.service';

import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {RoutesSearchService} from '../services/routes.search.service';
import {GeoScopeModel} from '../../model/geoscope.model';
import {TradeModel} from '../../model/trade.model';
import {MissingRoutingModel} from '../models/missing-routing.model';
import {ContractModel} from '../../model/contract.model';
import {CountryModel} from '../../model/country.model';
import {CountryService} from '../../services/country.service';


@Component({
  selector: 'app-search-ocean-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.css']
})
export class SearchRoutesComponent implements OnInit, OnChanges {

  title = 'COQU Missing Routes';
  isCollapsed = true;
  button_name = 'Hide Form';
  showSpinner = false;
  isActive = false;
  routes: Array<MissingRoutingModel> = [];

  searchFormOceanRoutes: FormGroup;
  possiblePOLs: GeoScopeModel[] = [];
  possibleTrades: TradeModel[] = [];
  possibleContracts: ContractModel[] = [];
  possibleContractGroups: ContractModel[] = [];
  possibleCountries: Array<CountryModel> = [];


  constructor(private enumService: EnumService, private countryService: CountryService,
              private masterDataService: GeoScopeService, private searchService: RoutesSearchService) {
    console.log('constructor');


    this.searchFormOceanRoutes = new FormGroup({
      trade: new FormControl(''),
      contract: new FormControl(''),
      singleContractOnly: new FormControl(false),
      contractGroup: new FormControl('', Validators.required),
      portOfLoading: new FormControl(''),
      countryCode: new FormControl(''),
      byCountryCode: new FormControl(true)

    });

    // set default values in form
    this.patchDefaultValues();

    // event handler
    this.onTradeChanges(this.trade);
    this.onContractChanges(this.contract);
    this.onContractGroupChanges(this.contractGroup);

    this.onSingleContractOnly(this.singleContractOnly);
    this.onPortOfLoadingChanges(this.portOfLoading);

    this.onCountryCodeChanges(this.countryCode);

  }

  get form() {
    return this.searchFormOceanRoutes;
  }


  get trade() {
    return this.form.get('trade');
  }

  get contract() {
    return this.form.get('contract');
  }

  get contractGroup() {
    return this.form.get('contractGroup');
  }

  get portOfLoading() {
    return this.form.get('portOfLoading');
  }

  get singleContractOnly() {
    return this.form.get('singleContractOnly');
  }

  get countryCode() {
    return this.form.get('countryCode');
  }

  get byCountryCode() {
    return this.form.get('byCountryCode');
  }


  toggle() {
    this.isCollapsed = !this.isCollapsed;

    // CHANGE THE TEXT OF THE BUTTON.
    if (this.isCollapsed) {
      this.button_name = 'Hide Form';
    } else {
      this.button_name = 'Show Form';
    }
  }

  isInvalid() {
    return this.form.invalid;
  }


  filterMissingRoutes() {
    console.log('filter ocean routes');
    this.showSpinner = false;
    this.routes = [];
    this.searchService.getRoutings(this.form.value).subscribe(result => {
      console.log('routings: ' + JSON.stringify(result));
      if (result && result.length > 0) {
        this.routes = result;
        this.toggle();
      }
    });
  }


  reset() {
    this.patchDefaultValues();
    this.possiblePOLs = [];
    this.possibleContracts = [];
    this.possibleContractGroups = [];
    this.possibleTrades = [];

  }


  private onTradeChanges(control: AbstractControl) {
    control.valueChanges


      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleTrades = [];
          this.trade.markAsDirty();
          return;
        }
        if (theLength < 2) {
          this.possibleTrades = [];
          return;
        }

        this.masterDataService.filterTrades(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].trade_code;
              this.trade.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.trade.value));
              this.trade.markAsUntouched();

            } else {
              this.possibleTrades = result;

            }
          });

      });

  }

  private onPortOfLoadingChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possiblePOLs = [];
          this.portOfLoading.markAsDirty();
          return;
        }
        if (theLength < 2) {
          this.possiblePOLs = [];
          return;
        }

        this.masterDataService.filterPorts(data).subscribe(
          result => {
            if (result.length === 0) {
              this.portOfLoading.markAsTouched();

            } else if (result.length === 1) {
              const singleRow: string = result[0].location_code;
              this.portOfLoading.patchValue(singleRow.toUpperCase().substr(0, 3));
              console.log('single:' + JSON.stringify(this.portOfLoading.value));
              this.portOfLoading.markAsUntouched();

            } else {
              this.portOfLoading.markAsUntouched();

              this.possiblePOLs = result;

            }
          });

      });

  }


  private onCountryCodeChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        if (data.toString().trim().length === 0) {
          this.possibleCountries = [];
          this.countryCode.markAsPristine();
          return;
        }
        this.countryService.filterCountries(data).subscribe(
          result => {
            if (result.length === 1) {
              this.countryCode.patchValue(result[0].country_code);
              this.possibleCountries = [];
            } else {
              this.possibleCountries = result;
            }
          });
      });

  }


  private onContractChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleContracts = [];
          this.contract.markAsDirty();
          return;
        }
        if (theLength < 4) {
          this.possibleContracts = [];
          return;
        }

        this.masterDataService.filterContracts(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].no;
              this.contract.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.contract.value));
              this.possibleContracts = [];
              this.contract.markAsUntouched();

            } else {
              this.possibleContracts = result;

            }
          });
      });
  }


  private onContractGroupChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleContractGroups = [];
          this.contractGroup.markAsDirty();
          return;
        }
        if (theLength < 4) {
          this.possibleContractGroups = [];
          return;
        }

        this.masterDataService.filterContractGroups(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].no;
              this.contractGroup.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.contract.value));
              this.possibleContractGroups = [];
              this.contractGroup.markAsUntouched();
            } else {
              this.possibleContractGroups = result;
            }
          });
      });
  }

  private onSingleContractOnly(control: AbstractControl) {
    control.valueChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(data => {
        if (data) {
          console.log('single contract only');
          this.contractGroup.setValidators([]);
          this.contract.setValidators(
            [Validators.required]
          );
          this.contract.patchValue('');
          this.contract.markAsDirty({onlySelf: true});
          this.possibleContracts = [];
        } else {
          console.log('contract group');
          this.contract.setValidators([]);
          this.contractGroup.setValidators(
            [Validators.required]
          );
          this.contractGroup.patchValue('');
          this.contractGroup.markAsDirty({onlySelf: true});
          this.possibleContractGroups = [];

        }
      });
  }

  searchSingleContract() {
    return this.singleContractOnly.value === true;

  }

  byCountry() {
    return this.byCountryCode.value === true;
  }

  private patchDefaultValues() {
    this.trade.patchValue('');
    this.portOfLoading.patchValue('');
    this.contract.patchValue('');
    this.contractGroup.patchValue('');
    this.singleContractOnly.patchValue(false);
    this.byCountryCode.patchValue(true);

  }


  ngOnInit() {
    console.log('init');

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes' + JSON.stringify(changes));
  }


}
