import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {NotificationComponent} from './notification/notification.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    PageNotFoundComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotificationComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ]
})
export class CoreModule {
}
