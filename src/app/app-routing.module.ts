import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CallbackComponent} from './pages/callback/callback.component';
import {PingComponent} from './pages/ping/ping.component';
import {UnauthGuard} from './common/services/unauth-guard.service';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ping',
    component: PingComponent
  },
  {
    path: 'callback',
    component: CallbackComponent,
    // canActivate: [
    //   UnauthGuard
    // ]
  },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
