import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageSwitchComponent} from './components/language-switch/language-switch.component';
import {AboutComponent} from './pages/about/about.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HomeEffects} from './pages/home/store/home.effects';
import {FormsModule} from '@angular/forms';
import {homeFeatureKey} from './pages/home/store/home.store';
import {homeReducer} from './pages/home/store/home.reducer';
import {PrerequisitesComponent} from './components/prerequisites/prerequisites.component';
import {ApiReferenceComponent} from './components/api-reference/api-reference.component';
import {JsonFetchComponent} from './components/json-fetch/json-fetch.component';


@NgModule({
  declarations: [
    HomeComponent,
    LanguageSwitchComponent,
    AboutComponent,
    PrerequisitesComponent,
    ApiReferenceComponent,
    JsonFetchComponent
  ],
  exports: [
    HomeComponent,
    ApiReferenceComponent
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
