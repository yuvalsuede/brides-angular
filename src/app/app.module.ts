import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {EmptyComponent} from './empty.component';
import {HomeComponent} from './pages/home/home.component';
import {CallbackComponent} from './pages/callback/callback.component';
import {PingComponent} from './pages/ping/ping.component';
import {CoreModule} from './common/core.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppContext} from './app-context.service';
import {HeaderModule} from './common/modules/header/header.module';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    EmptyComponent,
    HomeComponent,
    PingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    // brides modules
    HeaderModule

  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
