import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {GeoScopeType} from '../../enums/geoscope.type';
import {EnumService} from '../../services/enum.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  locationForm: FormGroup;
  geoScopeTypeList: Array<string>;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private enumService: EnumService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.geoScopeTypeList = this.enumService.getEnumValues(GeoScopeType);
    this.locationForm = this.formBuilder.group({
      geoscope_id: [null,],
      country_code: [null, Validators.required],
      location_code: [null, Validators.required],
      geoscope_type: [null, Validators.required],
      location_name: [null, Validators.required],
      is_port: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addLocation(this.locationForm.value)
      .subscribe((res: any) => {
         this.isLoadingResults = false;
        this.router.navigate(['/location-details', this.locationForm.get('location_code').value]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
