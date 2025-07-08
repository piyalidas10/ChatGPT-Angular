import { TestBed } from '@angular/core/testing';

import { OPENAI_API_CONFIG } from '../tokens/openai-api-config';
import { OPSupportedModels } from '../constants/ai-models';
import { OpenaiService } from './openai.service';

describe('GeminiService', () => {
  let service: OpenaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OPENAI_API_CONFIG,
          useValue: {
            apiKey: 'testAPIKey',
            model: OPSupportedModels[1].name,
          },
        },
      ],
    });
    service = TestBed.inject(OpenaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});