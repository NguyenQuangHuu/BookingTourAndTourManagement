import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';
import { routes } from './app.routes';
import {provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {provideHttpClient, withXhr} from '@angular/common/http';
echarts.use([])
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions(),withComponentInputBinding()),
    provideEchartsCore({echarts}),
    provideHttpClient(withXhr())
  ]
};
