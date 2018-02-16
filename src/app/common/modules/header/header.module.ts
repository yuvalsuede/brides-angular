import {NgModule} from '@angular/core';

import {HeaderComponent} from './header.component';
import {BridesSharedModule} from '../../shared.module';

@NgModule({
  imports: [
    BridesSharedModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [],
})
export class HeaderModule {
}
