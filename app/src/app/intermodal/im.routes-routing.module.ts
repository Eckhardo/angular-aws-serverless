import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchIntermodalComponent} from './im.search/search-intermodal.component';
import {ResultIntermodalComponent} from './im.result/result-intermodal.component';

export const INTERMODAL_ROUTES: Routes = [
  {path: 'searchIntermodal', component: SearchIntermodalComponent}
];
export const INTERMODAL_COMPONENTS = [SearchIntermodalComponent, ResultIntermodalComponent];

@NgModule({
    imports: [
      RouterModule.forChild(INTERMODAL_ROUTES)
    ],
    exports: [RouterModule]

  }
)

export class IntermodalRoutesRoutingModule {
}
