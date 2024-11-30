import React, { useState } from 'react';
import { Plus, ArrowLeft, Trash2 } from 'lucide-react';
import { Survey, SurveyControl } from '../../types/Survey';
import { Modal } from '../Modal';
import { QuestionForm } from './QuestionForm';

interface SurveyEditorProps {
  survey: Survey;
  onBack: () => void;
  onAddControl: (surveyId: string, control: Omit<SurveyControl, 'id' | 'order'>) => void;
  onUpdateControl: (surveyId: string, controlId: string, updates: Partial<SurveyControl>) => void;
  onDeleteControl: (surveyId: string, controlId: string) => void;
}

export function SurveyEditor({ survey, onBack, onAddControl, onUpdateControl, onDeleteControl }: SurveyEditorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuestion = (control: Omit<SurveyControl, 'id' | 'order'>) => {
    onAddControl(survey.id, control);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Surveys
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {survey.description && (
          <p className="text-gray-600 mb-6">{survey.description}</p>
        )}

        <div className="space-y-6">
          {survey.controls.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No questions yet. Add your first question above!</p>
            </div>
          ) : (
            survey.controls.map((control, index) => (
              <div
                key={control.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">Q{index + 1}.</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{control.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 mr-2">Type: {control.type}</span>
                        {control.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Required</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onDeleteControl(survey.id, control.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {control.type === 'section' ? (
                  <div className="ml-8 mt-2">
                    {control.subtitle && (
                      <p className="text-sm text-gray-600">{control.subtitle}</p>
                    )}
                  </div>
                ) : control.type === 'radio' ? (
                  <div className="ml-8 mt-2 space-y-2">
                    {control.options.map(option => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          disabled
                          className="h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label className="text-gray-700">{option.label}</label>
                      </div>
                    ))}
                  </div>
                ) : control.type === 'text' && (
                  <div className="ml-8 mt-2 space-y-2">
                    {control.multiline ? (
                      <textarea
                        disabled
                        rows={3}
                        placeholder={control.placeholder}
                        className="w-full p-2 border rounded-md bg-white resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        disabled
                        placeholder={control.placeholder}
                        className="w-full p-2 border rounded-md bg-white"
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Debug Information */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Information</h3>
        <pre className="whitespace-pre-wrap text-xs bg-white p-4 rounded border overflow-auto max-h-96">
          {JSON.stringify(survey, null, 2)}
        </pre>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Question"
      >
        <QuestionForm onSubmit={handleAddQuestion} />
      </Modal>
    </div>
  );
}