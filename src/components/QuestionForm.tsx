import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SurveyControl } from '../types/Survey';

interface QuestionFormProps {
  onSubmit: (control: Omit<SurveyControl, 'id' | 'order'>) => void;
}

export function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [type, setType] = useState<'radio' | 'text' | 'section'>('radio');
  const [title, setTitle] = useState('');
  const [required, setRequired] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [multiline, setMultiline] = useState(false);
  const [options, setOptions] = useState([{ id: '1', label: '', value: '' }]);
  const [subtitle, setSubtitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (type === 'radio') {
      const validOptions = options.filter(opt => opt.label.trim());
      if (validOptions.length < 2) return;

      onSubmit({
        type: 'radio',
        title: title.trim(),
        required,
        options: validOptions,
      });
    } else if (type === 'text') {
      onSubmit({
        type: 'text',
        title: title.trim(),
        required,
        placeholder: placeholder.trim(),
        placeholder: placeholder.trim(),
        multiline,
      });
    } else if (type === 'section') {
      onSubmit({
        type: 'section',
        title: title.trim(),
        subtitle: subtitle.trim(),
      });
    }
  };

  const addOption = () => {
    setOptions([...options, { id: crypto.randomUUID(), label: '', value: '' }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 1) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const updateOption = (id: string, label: string) => {
    setOptions(
      options.map(opt =>
        opt.id === id ? { ...opt, label, value: label.toLowerCase() } : opt
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'radio' | 'text' | 'section')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="radio">Multiple Choice</option>
          <option value="text">Text Input</option>
          <option value="section">Section Header</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Question Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your question"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
          Required question
        </label>
      </div>

      {type === 'radio' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => updateOption(option.id, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter option"
              />
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </button>
        </div>
      )}

      {type === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Placeholder Text</label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter placeholder text"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="multiline"
              checked={multiline}
              onChange={(e) => setMultiline(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="multiline" className="ml-2 block text-sm text-gray-700">
              Allow multiple lines
            </label>
          </div>
        </div>
      )}

      {type === 'section' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle (Optional)</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter section subtitle"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Question
      </button>
    </form>
  );
}