export type SurveyControlType = 'radio' | 'text' | 'section';

export interface SurveyControlBase {
  id: string;
  type: SurveyControlType;
  title: string;
  required?: boolean;
  order: number;
}

export interface RadioControl extends SurveyControlBase {
  type: 'radio';
  options: {
    id: string;
    label: string;
    value: string;
  }[];
}

export interface TextControl extends SurveyControlBase {
  type: 'text';
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
}

export interface SectionControl extends SurveyControlBase {
  type: 'section';
  subtitle?: string;
}

export type SurveyControl = RadioControl | TextControl | SectionControl;

export interface Survey {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  controls: SurveyControl[];
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  controls: SurveyControl[];
}