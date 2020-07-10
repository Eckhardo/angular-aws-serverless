
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule, ROOT_COMPONENTS} from './app-routing.module';

import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {IntermodalRoutesModule} from './intermodal/im.routes.module';
import {EnumService} from './services/enum.service';
import {MissingRoutingsModule} from './missingRoutes/missing-routes.module';
import {NewRoutingEngineModule} from './newRoutingEngine/new-routing-engine.module';
import {SharedModule} from './shared/shared.module';
import {GeoscopeModule} from './geoscope/geoscope.module';
import {LocationsModule} from './locations/locations.module';


@NgModule({
  declarations: [ROOT_COMPONENTS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    GeoscopeModule,
    LocationsModule,
    MissingRoutingsModule,
    IntermodalRoutesModule,
    NewRoutingEngineModule,
    AppRoutingModule

  ],

  providers: [EnumService,
    {provide: APP_BASE_HREF, useValue: window['_app_base'] || '/'}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
