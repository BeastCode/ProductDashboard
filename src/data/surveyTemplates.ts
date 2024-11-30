import { SurveyTemplate } from '../types/Survey';

export const surveyTemplates: SurveyTemplate[] = [
  {
    id: 'customer-feedback',
    name: 'Customer Feedback',
    description: 'Basic customer satisfaction survey template',
    controls: [
      {
        id: 'satisfaction',
        type: 'radio',
        title: 'How satisfied are you with our product?',
        required: true,
        order: 1,
        options: [
          { id: '1', label: 'Very Satisfied', value: '5' },
          { id: '2', label: 'Satisfied', value: '4' },
          { id: '3', label: 'Neutral', value: '3' },
          { id: '4', label: 'Dissatisfied', value: '2' },
          { id: '5', label: 'Very Dissatisfied', value: '1' },
        ],
      },
      {
        id: 'feedback',
        type: 'text',
        title: 'What could we improve?',
        multiline: true,
        placeholder: 'Please share your thoughts...',
        order: 2,
      },
    ],
  },
  {
    id: 'product-research',
    name: 'Product Research',
    description: 'Gather insights about product features and usage',
    controls: [
      {
        id: 'usage-frequency',
        type: 'radio',
        title: 'How often do you use our product?',
        required: true,
        order: 1,
        options: [
          { id: '1', label: 'Daily', value: 'daily' },
          { id: '2', label: 'Weekly', value: 'weekly' },
          { id: '3', label: 'Monthly', value: 'monthly' },
          { id: '4', label: 'Rarely', value: 'rarely' },
        ],
      },
      {
        id: 'feature-request',
        type: 'text',
        title: 'What features would you like to see?',
        multiline: true,
        order: 2,
      },
    ],
  },
];