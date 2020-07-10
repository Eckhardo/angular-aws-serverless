import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ChangeDetectorPipe} from './pipes/change-detector-pipe';

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

export const ROOT_COMPONENTS = [AppComponent, HomeComponent, ChangeDetectorPipe];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
