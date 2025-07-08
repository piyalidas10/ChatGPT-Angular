import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { OPENAI_API_CONFIG } from './shared/tokens/openai-api-config';
import { OPSupportedModels } from './shared/constants/ai-models';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: OPENAI_API_CONFIG,
      useValue: {
        apiKey: environment.API_KEY,
        model: OPSupportedModels[0].name
      }
    },
    provideAnimations(),
  ]
};
