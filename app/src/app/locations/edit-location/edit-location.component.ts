import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {EnumService} from '../../services/enum.service';
import {GeoScopeType} from '../../enums/geoscope.type';

import {GeoScopeModel} from '../../model/geoscope.model';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  locationForm: FormGroup;
  id = '';
  countryCode = '';
  location_code: '';
  geoScopeType: '';
  geoScopeTypeList: Array<string>;
  name = '';
  port = false;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private enumService: EnumService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLocationByCode(this.route.snapshot.params.location_code);
    this.geoScopeTypeList = this.enumService.getEnumValues(GeoScopeType);
    console.log('Types ' + JSON.stringify(this.geoScopeTypeList));
    this.locationForm = this.formBuilder.group({
      geoscope_id: [null],
      country_code: [null, Validators.required],
      location_code: [null, Validators.required],
      geoscope_type: [null, Validators.required],
      location_name: [null, Validators.required],
      is_port: [null, Validators.required]
    });
  }

  getLocationByCode(code: any) {

    this.api.getLocationByCode(code).subscribe((data: GeoScopeModel) => {
      this.id = data.geoscope_id;
      this.locationForm.setValue({
        geoscope_id: data.geoscope_id,
        country_code: data.country_code,
        location_code: data.location_code,
        geoscope_type: data.geoscope_type,
        location_name: data.location_name,
        is_port: data.is_port
      });
    });
  }


  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateLocation(this.locationForm.get('location_code').value, this.locationForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/location-details', this.locationForm.get('location_code').value]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


  locationDetails() {
    this.router.navigate(['/location-details', this.locationForm.get('location_code').value]);
  }
}
