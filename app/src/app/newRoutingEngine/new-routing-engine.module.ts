import {NgModule} from '@angular/core';

import {NewRoutingEngineComponent} from './nre.search.component/nre-search.component';
import {RoutesRoutingModule} from './new-routing-engine.routes.module';

import {EnumService} from '../services/enum.service';
import {NewRoutingeEngineResultComponent} from './nre.result.component/nre-result.component';
import {NewRoutesSearchService} from './services/new-routing-engine.search.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({

  declarations: [NewRoutingeEngineResultComponent, NewRoutingEngineComponent],

  imports: [SharedModule, RoutesRoutingModule],

  providers: [NewRoutesSearchService, EnumService],

})
export class NewRoutingEngineModule {
}
