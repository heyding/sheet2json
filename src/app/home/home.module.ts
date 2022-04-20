import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageSwitchComponent} from './components/language-switch/language-switch.component';
import {AboutComponent} from './pages/about/about.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HomeEffects} from './pages/home/store/home.effects';
import {FormsModule} from '@angular/forms';
import {homeFeatureKey} from './pages/home/store/home.store';
import {homeReducer} from './pages/home/store/home.reducer';
import {PrerequisiteListComponent} from './components/prerequisite-list/prerequisite-list.component';
import {PrerequisiteComponent} from './components/prerequisite/prerequisite.component';
import {ApiReferenceComponent} from './components/api-reference/api-reference.component';
import { JsonFetchComponent } from './components/json-fetch/json-fetch.component';


@NgModule({
  declarations: [
    HomeComponent,
    LanguageSwitchComponent,
    AboutComponent,
    PageNotFoundComponent,
    PrerequisiteListComponent,
    PrerequisiteComponent,
    ApiReferenceComponent,
    JsonFetchComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    StoreModule.forFeature(homeFeatureKey, homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    FormsModule
  ]
})
export class HomeModule {
}
