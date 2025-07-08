export type OPAiModel = 'gpt-4.1' | 'gpt-4o';

export type OPSupportedModel = {
  title: string;
  name: OPAiModel;
};
export type OPConfig = {
  apiKey: string;
  model: OPAiModel;
  debug?: boolean;
};