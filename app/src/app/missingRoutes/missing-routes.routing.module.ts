import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchRoutesComponent} from './missing-routes.search.component/search-routes.component';

export const routes: Routes = [
  {path: 'searchRoutes', component: SearchRoutesComponent}
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
