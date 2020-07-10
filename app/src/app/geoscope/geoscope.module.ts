import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GEOSCOPE_COMPONENTS, GeoscopeRoutingModule} from './geoscope-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';


@NgModule({
  declarations: [GEOSCOPE_COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    GeoscopeRoutingModule
  ],
  entryComponents: [
    DialogBoxComponent
  ]
})
export class GeoscopeModule { }
