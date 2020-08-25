import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {GeoScopeModel} from '../../model/geoscope.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  location: GeoScopeModel = new GeoScopeModel('', '', '', '');
  isLoadingResults = true;

  ngOnInit(): void {
    this.getLocationDetails(this.route.snapshot.params.location_code);
  }

  getLocationDetails(code: string) {
    this.api.getLocationByCode(code)
      .subscribe((data: any) => {
        this.location = data;
        this.isLoadingResults = false;
      });
  }

  deleteLocation(id: any) {
    this.isLoadingResults = true;
    this.api.deleteLocation(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/locations']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
