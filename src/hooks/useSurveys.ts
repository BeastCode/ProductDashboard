import { useState, useCallback } from 'react';
import { Survey, SurveyControl, SurveyTemplate } from '../types/Survey';

export function useSurveys() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const createSurvey = useCallback((title: string, description: string) => {
    const newSurvey: Survey = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date(),
      controls: [],
    };
    setSurveys(prev => [...prev, newSurvey]);
    return newSurvey.id;
  }, []);

  const createFromTemplate = useCallback((template: SurveyTemplate) => {
    const newSurvey: Survey = {
      id: crypto.randomUUID(),
      title: template.name,
      description: template.description,
      createdAt: new Date(),
      controls: [...template.controls],
    };
    setSurveys(prev => [...prev, newSurvey]);
    return newSurvey.id;
  }, []);

  const addControl = useCallback((surveyId: string, control: Omit<SurveyControl, 'id' | 'order'>) => {
    setSurveys(prev => prev.map(survey => {
      if (survey.id !== surveyId) return survey;
      
      const newControl = {
        ...control,
        id: crypto.randomUUID(),
        order: survey.controls.length + 1,
      };
      
      const updatedControls = [...survey.controls, newControl];
      
      return {
        ...survey,
        controls: updatedControls,
      };
    }));
  }, []);

  const updateControl = useCallback((surveyId: string, controlId: string, updates: Partial<SurveyControl>) => {
    setSurveys(prev => prev.map(survey => {
      if (survey.id !== surveyId) return survey;
      
      const updatedControls = survey.controls.map(control =>
        control.id === controlId ? { ...control, ...updates } : control
      );
      
      return {
        ...survey,
        controls: updatedControls,
      };
    }));
  }, []);

  const deleteControl = useCallback((surveyId: string, controlId: string) => {
    setSurveys(prev => prev.map(survey => {
      if (survey.id !== surveyId) return survey;
      return {
        ...survey,
        controls: survey.controls.filter(control => control.id !== controlId),
      };
    }));
  }, []);

  const deleteSurvey = useCallback((surveyId: string) => {
    setSurveys(prev => prev.filter(survey => survey.id !== surveyId));
  }, []);

  return {
    surveys,
    createSurvey,
    createFromTemplate,
    addControl,
    updateControl,
    deleteControl,
    deleteSurvey,
  };
}