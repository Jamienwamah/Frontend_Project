import { ApplicationConfig } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { csrfInterceptor } from './core/interceptors/csrf.interceptor';

import { provideRouter } from '@angular/router';

import { appRoutes } from './routes'; // Imports src/app/routes/index.ts automatically

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(appRoutes),

    provideHttpClient(

      withInterceptors([

        csrfInterceptor

      ])

    )

  ]

};