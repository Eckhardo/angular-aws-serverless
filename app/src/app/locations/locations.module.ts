import {NgModule} from '@angular/core';

import {LOCATION_COMPONENTS, LocationsRoutingModule} from './locations-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LOCATION_COMPONENTS],
  imports: [
    SharedModule,
    LocationsRoutingModule
  ],
  providers: []
})
export class LocationsModule { }
