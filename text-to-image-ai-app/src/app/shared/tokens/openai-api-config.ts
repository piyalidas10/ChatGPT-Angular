import { InjectionToken } from '@angular/core';
import { OPConfig } from '../types';

export const OPENAI_API_CONFIG = new InjectionToken<OPConfig>(
  'OPENAI_API_CONFIG'
);