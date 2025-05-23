import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const categories = [
  'general',
  'business',
  'technology',
  'sports',
  'entertainment',
  'science',
  'health',
];

const frequencies = ['immediate', 'hourly', 'daily'];

const AlertPreference = ({ currentPreferences, onSave }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [frequency, setFrequency] = useState('daily');

  useEffect(() => {
    if (currentPreferences) {
      setSelectedCategories(currentPreferences.categories || []);
      setFrequency(currentPreferences.frequency || 'daily');
    }
  }, [currentPreferences]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
  if (selectedCategories.length === 0) {
    alert("Please select at least one category before saving.");
    return;
  }

  const preferences = {
    categories: selectedCategories,
    frequency,
  };
  onSave(preferences);
}; 


  return (
    <div className="bg-white p-4 rounded shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">News Alert Preferences</h2>

      <div className="mb-4">
        <p className="font-semibold mb-2">Select Categories:</p>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Alert Frequency:</p>
        <select
          className="border p-2 rounded"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          {frequencies.map((freq) => (
            <option key={freq} value={freq}>
              {freq.charAt(0).toUpperCase() + freq.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={handleSave} className="bg-blue-600 text-white">
        Save Preferences
      </Button>
    </div>
  );
};

export default AlertPreference;
