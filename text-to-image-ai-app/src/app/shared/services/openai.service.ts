import { inject, Injectable, signal } from '@angular/core';
import { OPENAI_API_CONFIG } from '../tokens/openai-api-config';
import { OpenAI } from 'openai';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  openaiApiConfig = inject(OPENAI_API_CONFIG);
  openAI!: OpenAI;
  loadingService = inject(LoadingService);

  constructor() {
    this.checkConfig();
  }
  checkConfig() {
    if (this.openAI) {
      return;
    }
    if (!this.openaiApiConfig.apiKey) {
      throw new Error('Openai Api Key not provided');
    }
    if (!this.openaiApiConfig.model) {
      throw new Error('Openai model not provided');
    }
    /*
    ERROR OpenAIError: It looks like you're running in a browser-like environment.

    This is disabled by default, as it risks exposing your secret API credentials to attackers.
    If you understand the risks and have appropriate mitigations in place,
    you can set the `dangerouslyAllowBrowser` option to `true`, e.g.,

    new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
    */
    this.openAI = new OpenAI({
      apiKey: this.openaiApiConfig.apiKey, // This is the default and can be omitted
      dangerouslyAllowBrowser: true // run with insecure browser
    });
  }

  async generateTextFromImg(prompt: string, base64Image: any, mimeType: any) {
    try {
      this.checkConfig();
      // const requestData={
      //     model: this.openaiApiConfig.model,
      //     prompt: prompt,
      //     temperature: 0.95,
      //     max_tokens: 150,
      //     top_p: 1.0,
      //     frequency_penalty: 0.0,
      //     presence_penalty: 0.0,
      //     stream: false
      //   };
      const result = await this.openAI.responses.create({
        model: this.openaiApiConfig.model,
        instructions: prompt,
        input: 'Are semicolons optional in JavaScript?',
      });
      // const text = this.formatText(result.response.text());
      console.log('result => ', result);
      this.loadingService.loadingOff();
    } catch (error) {
      console.error("An error occurred:", error);
      this.loadingService.loadingOff();
    }
    return '';
  }

  formatText(text: string) {
    return text.replace('\n', '<br/>').replace('*   **', '<b>').replace(':**', '</b>');
  }
}
