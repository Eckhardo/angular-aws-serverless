import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocationsComponent} from './locations/locations.component';
import {LocationDetailsComponent} from './location-details/location-details.component';
import {AddLocationComponent} from './add-location/add-location.component';
import {EditLocationComponent} from './edit-location/edit-location.component';

export const LOCATION_COMPONENTS = [LocationsComponent, LocationDetailsComponent, AddLocationComponent, EditLocationComponent];

const routes: Routes = [
  {
    path: 'locations',
    component: LocationsComponent,
    data: { title: 'List of Locations' }
  },
  {
    path: 'location-details/:location_code',
    component: LocationDetailsComponent,
    data: { title: 'Location Details' }
  },
  {
    path: 'add-location',
    component: AddLocationComponent,
    data: { title: 'Add Location' }
  },
  {
    path: 'edit-location/:location_code',
    component: EditLocationComponent,
    data: { title: 'Edit Location' }
  },
  { path: '',
    redirectTo: '/locations',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
