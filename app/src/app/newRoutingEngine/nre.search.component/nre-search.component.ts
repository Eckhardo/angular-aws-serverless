import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EnumService} from '../../services/enum.service';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {GeoScopeService} from '../../services/geoscope.service';
import {GeoScopeModel} from '../../model/geoscope.model';
import {VesselSystemModel} from '../../model/vesselsystem.model';
import {NewRoutesSearchService} from '../services/new-routing-engine.search.service';
import {NewRoutingModel} from '../models/nre.model';


@Component({
  selector: 'app-nre-search-routes',
  templateUrl: './nre-search.component.html',
  styleUrls: ['./nre-search.component.css']
})
export class NewRoutingEngineComponent implements OnInit, OnChanges {

  title = 'Search Ocean Routes (NRE)';
  isCollapsed = true;
  button_name = 'Hide Form';
  showSpinner = false;
  isActive = false;
  routes: Array<NewRoutingModel> = [];

  searchFormOceanRoutes: FormGroup;
  possiblePOLs: GeoScopeModel[] = [];
  possiblePODs: GeoScopeModel[] = [];

  possibleVS_1s: VesselSystemModel[] = [];
  possibleVS_2s: VesselSystemModel[] = [];
  possibleVS_3s: VesselSystemModel[] = [];


  possibleTS_1s: GeoScopeModel[] = [];
  possibleTS_2s: GeoScopeModel[] = [];
  possibleTS_3s: GeoScopeModel[] = [];

  numberTsPorts: Array<number> = [0, 1, 2, 3];

  constructor(private enumService: EnumService, private masterDataService: GeoScopeService,
              private searchService: NewRoutesSearchService) {
    console.log('constructor');


    this.searchFormOceanRoutes = new FormGroup({
      portOfLoading: new FormControl('', Validators.required),
      portOfDestination: new FormControl(''),
      vesselsystem_1: new FormControl(),
      vesselsystem_2: new FormControl(),
      vesselsystem_3: new FormControl(),
      ts_1: new FormControl(),
      ts_2: new FormControl(),
      ts_3: new FormControl(),
      includeInvalid: new FormControl(false),
      includeShunting: new FormControl(true),
      numberTs: new FormControl('1', Validators.required),

      startDate: new FormControl(new Date().toISOString(), Validators.required),
      endDate: new FormControl(new Date().toISOString())


    });
    console.log('constructor middle');
    // set default values in form
    this.patchDefaultValues();
    this.setEndDate(new Date(this.startDate.value));

    // event handler
    this.onPortOfLoadingChanges(this.portOfLoading);
    console.log('constructor pol');
    this.onPortOfDestinationChanges(this.portOfDestination);

    this.onStartDateChanges(this.startDate);
    console.log('constructor startdate ready');

    this.onVS1Changes(this.vesselsystem_1);
    this.onVS2Changes(this.vesselsystem_2);
    this.onVS3Changes(this.vesselsystem_3);
    console.log('constructor vs ready');
    this.onTsPortChanges(this.ts_1, 1);
    this.onTsPortChanges(this.ts_2, 2);
    this.onTsPortChanges(this.ts_3, 3);
    console.log('constructor end');
  }

  get form() {
    return this.searchFormOceanRoutes;
  }


  get trade() {
    return this.form.get('trade');
  }

  get portOfLoading() {
    return this.form.get('portOfLoading');
  }


  get portOfDestination() {
    return this.form.get('portOfDestination');
  }

  get vesselsystem_1() {
    return this.form.get('vesselsystem_1');
  }

  get vesselsystem_2() {
    return this.form.get('vesselsystem_2');
  }

  get vesselsystem_3() {
    return this.form.get('vesselsystem_3');
  }

  get ts_1() {
    return this.form.get('ts_1');
  }

  get ts_2() {
    return this.form.get('ts_2');
  }

  get ts_3() {
    return this.form.get('ts_3');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  get numberTs() {
    return this.form.get('numberTs');
  }

  get includeInvalid() {
    return this.form.get('includeInvalid');
  }

  get includeShunting() {
    return this.form.get('includeShunting');
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


  filterOceanRoutes() {
    console.log('filter ocean routes');
    this.showSpinner = false;
    this.routes = [];
    this.searchService.getRoutings(this.form.value).subscribe(result => {
      console.log('ocean routings: ' + JSON.stringify(result));
      if (result && result.length > 0) {
        this.routes = result;
        this.toggle();
      }
    });
  }


  reset() {
    this.patchDefaultValues();
    this.setEndDate(this.startDate.value);
    this.possiblePODs = [];
    this.possiblePOLs = [];
    this.possibleVS_1s = [];
    this.possibleVS_2s = [];
    this.possibleVS_3s = [];
    this.numberTsPorts = [];
    this.possibleTS_1s = [];
    this.possibleTS_2s = [];
    this.possibleTS_3s = [];

  }


  private onPortOfLoadingChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged())
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possiblePOLs = [];
          this.portOfLoading.markAsDirty();
          return;
        }
        if (theLength < 3) {
          this.possiblePOLs = [];
          return;
        }

        this.masterDataService.filterPortLocations(data).subscribe(
          result => {
            if (result.length === 0) {
              this.portOfLoading.markAsTouched();

            } else if (result.length === 1) {
              const singleRow: string = result[0].location_code;
              this.portOfLoading.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.portOfLoading.value));
              this.portOfLoading.markAsUntouched();

            } else {
              this.portOfLoading.markAsUntouched();

              this.possiblePOLs = result;

            }
          });

      });

  }


  private onPortOfDestinationChanges(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possiblePODs = [];
          this.portOfDestination.markAsDirty();
          return;
        }
        if (theLength < 3) {
          this.possiblePODs = [];
          return;
        }

        this.masterDataService.filterPodLocations(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 0) {
              this.portOfDestination.markAsTouched();

            } else if (result.length === 1) {
              const singleRow: string = result[0].location_code;
              this.portOfDestination.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.portOfLoading.value));
              this.portOfDestination.markAsUntouched();
            } else {
              this.portOfDestination.markAsUntouched();

              this.possiblePODs = result;

            }
          });

      });

  }

  private onTsPortChanges(control: AbstractControl, num: number) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength < 3) {
          switch (num) {
            case 1: {
              this.possibleTS_1s = [];
              break;
            }
            case 2: {
              this.possibleTS_2s = [];
              break;
            }
            case 3: {
              this.possibleTS_3s = [];
              break;
            }
            default: {
              break;
            }
          }
          return;
        }
        this.masterDataService.filterPodLocations(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].location_code;
              switch (num) {
                case 1: {
                  this.ts_1.patchValue(singleRow.toUpperCase());

                  break;
                }
                case 2: {
                  this.ts_2.patchValue(singleRow.toUpperCase());
                  break;
                }
                case 3: {
                  this.ts_3.patchValue(singleRow.toUpperCase());
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              switch (num) {
                case 1: {
                  this.possibleTS_1s = result;

                  break;
                }
                case 2: {
                  this.possibleTS_2s = result;
                  break;
                }
                case 3: {
                  this.possibleTS_3s = result;
                  break;
                }
                default: {
                  break;
                }
              }

            }
          });

      });

  }

  private onVS1Changes(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleVS_1s = [];
          this.vesselsystem_1.markAsDirty();
          return;
        }
        if (theLength < 3) {
          this.possibleVS_1s = [];
          return;
        }

        this.masterDataService.filterVS(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].vs_name;
              this.vesselsystem_1.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.vesselsystem_1.value));
              this.vesselsystem_1.markAsUntouched();

            } else {
              this.possibleVS_1s = result;

            }
          });

      });

  }


  private onVS2Changes(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleVS_2s = [];
          this.vesselsystem_2.markAsDirty();
          return;
        }
        if (theLength < 3) {
          this.possibleVS_2s = [];
          return;
        }

        this.masterDataService.filterVS(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].vs_name;
              this.vesselsystem_2.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.vesselsystem_1.value));
              this.vesselsystem_2.markAsUntouched();

            } else {
              this.possibleVS_2s = result;

            }
          });

      });

  }

  private onVS3Changes(control: AbstractControl) {
    control.valueChanges
      .pipe(debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.possibleVS_3s = [];
          this.vesselsystem_3.markAsDirty();
          return;
        }
        if (theLength < 3) {
          this.possibleVS_3s = [];
          return;
        }

        this.masterDataService.filterVS(data).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].vs_name;
              this.vesselsystem_3.patchValue(singleRow.toUpperCase());
              console.log('single:' + JSON.stringify(this.vesselsystem_1.value));
              this.vesselsystem_3.markAsUntouched();

            } else {
              this.possibleVS_3s = result;

            }
          });

      });

  }

  private onStartDateChanges(control: AbstractControl | any) {
    console.log('onStartDateChanges start');

    control.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      this.startDate.patchValue(new Date(data).toISOString());
      console.log('onStartDateChanges middle');
      this.setEndDate(new Date(data));
    });
    console.log('onStartDateChanges end');

  }

  private setEndDate(date: Date) {
    const newDay: number = ( date.getDate() + 14);
    const newDate: Date = new Date();
    newDate.setDate(newDay);

    this.endDate.patchValue(newDate.toISOString());
  }

  private patchDefaultValues() {
    this.includeInvalid.patchValue(false);
    this.includeShunting.patchValue(true);
    this.numberTs.patchValue('1');
    this.portOfLoading.patchValue('');
    this.portOfDestination.patchValue('');
    this.vesselsystem_1.patchValue('');
    this.vesselsystem_2.patchValue('');
    this.vesselsystem_3.patchValue('');
    this.ts_1.patchValue('');
    this.ts_2.patchValue('');
    this.ts_3.patchValue('');
    this.startDate.patchValue(new Date().toISOString());

  }


  ngOnInit() {
    console.log('init');

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes' + JSON.stringify(changes));
  }


}
