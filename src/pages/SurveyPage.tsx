import React, { useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { useSurveys } from '../hooks/useSurveys';
import { SurveyList } from '../components/SurveyList';
import { Modal } from '../components/Modal';
import { Survey } from '../types/Survey';
import { surveyTemplates } from '../data/surveyTemplates';
import { SurveyEditor } from '../components/SurveyEditor';

export function SurveyPage() {
  const {
    surveys,
    createSurvey,
    createFromTemplate,
    deleteSurvey,
    addControl,
    updateControl,
    deleteControl,
  } = useSurveys();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  // Update selected survey when surveys change
  React.useEffect(() => {
    if (selectedSurvey) {
      const updatedSurvey = surveys.find(s => s.id === selectedSurvey.id);
      if (updatedSurvey) {
        setSelectedSurvey(updatedSurvey);
      }
    }
  }, [surveys, selectedSurvey]);

  const handleCreateSurvey = (template?: typeof surveyTemplates[0]) => {
    let surveyId;
    if (template) {
      surveyId = createFromTemplate(template);
    } else {
      surveyId = createSurvey('New Survey', '');
    }
    setIsModalOpen(false);

    // Use setTimeout to ensure state has updated
    setTimeout(() => {
      const newSurvey = surveys.find(s => s.id === surveyId);
      console.log('Created survey:', { surveyId, newSurvey, allSurveys: surveys });
      if (newSurvey) {
        setSelectedSurvey(newSurvey);
      }
    }, 0);
  };

  if (selectedSurvey) {
    return (
      <SurveyEditor
        survey={selectedSurvey}
        onBack={() => setSelectedSurvey(null)}
        onAddControl={addControl}
        onUpdateControl={updateControl}
        onDeleteControl={deleteControl}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Survey
        </button>
      </div>

      <SurveyList
        surveys={surveys}
        onEdit={setSelectedSurvey}
        onDelete={deleteSurvey}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Survey"
      >
        <div className="space-y-4">
          <button
            onClick={() => handleCreateSurvey()}
            className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium text-gray-900">Blank Survey</h3>
            <p className="text-sm text-gray-500">Start from scratch</p>
          </button>
          {surveyTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => handleCreateSurvey(template)}
              className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50"
            >
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}