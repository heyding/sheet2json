import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/pages/home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  // Wild Card Route for 404 request - make sure this is always the last element of the routes Array
  {path: '**', pathMatch: 'full', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
