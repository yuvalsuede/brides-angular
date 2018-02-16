import {StorageService} from './services/storage.service';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TokenInterceptor} from './services/auth0/token.interceptor';
import {AuthService} from './services/auth0/auth.service';
import {AppContext} from '../app-context.service';

// export function jwtOptionsFactory(storage: StorageService) {
//   return {
//     tokenGetter: () => {
//       const token: TOKEN = storage.api.local.get('token');
//       return token.accessToken;
//     },
//     whitelistedDomains: ['http://localhost:3000']
//   };
// }
const importExportDeclarationArray = [];

@NgModule({
  imports:
    [
      CommonModule,
      HttpClientModule,
      RouterModule,
      FormsModule,

      // JwtModule.forRoot({
      //   jwtOptionsProvider: {
      //     provide: JWT_OPTIONS,
      //     useFactory: jwtOptionsFactory,
      //     deps: [StorageService]
      //   }
      // })
    ],
  declarations: [
    ...importExportDeclarationArray
  ],
  exports: [...importExportDeclarationArray],
  providers: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,

      providers: [
        AppContext,
        // StorageService,
        AuthService,
        // UnauthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
