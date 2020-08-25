import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeoscopeListComponent} from './list/list-component';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';


const GEOSCOPE_ROUTES: Routes = [{path: 'geoscope', component: GeoscopeListComponent}];
export const GEOSCOPE_COMPONENTS = [GeoscopeListComponent, DialogBoxComponent];

@NgModule({
  imports: [RouterModule.forChild(GEOSCOPE_ROUTES)],
  exports: [RouterModule]
})
export class GeoscopeRoutingModule {
}
