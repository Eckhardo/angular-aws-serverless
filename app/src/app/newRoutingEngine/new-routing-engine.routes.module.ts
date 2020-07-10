import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewRoutingEngineComponent} from './nre.search.component/nre-search.component';

export const routes: Routes = [
  {path: 'searchNewRoutes', component: NewRoutingEngineComponent}
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

  }
)

export class RoutesRoutingModule {
}
