import React, { useState } from 'react';
import axios from 'axios';

const HostingOptions = () => {
  const [selectedHostingOption, setSelectedHostingOption] = useState('');
  const [showSubOptions, setShowSubOptions] = useState(false);

  const handleHostingOptionChange = (event) => {
    const option = event.target.value;
    setSelectedHostingOption(option);
    setShowSubOptions(option === 'Self Hosting');
  };

  const handleSaveHostingOption = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/options/save-hosting-option',
        { selectedHostingOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        alert('Hosting option saved successfully');
        setSelectedHostingOption('');
      }
    } catch (error) {
      console.error('Error saving hosting option:', error);
      alert('An error occurred while saving the hosting option');
    }
  };

  return (
    <div>
      <h2>Select a hosting option:</h2>
      <label>
        <input
          type="radio"
          value="Self Hosting"
          checked={selectedHostingOption === 'Self Hosting'}
          onChange={handleHostingOptionChange}
        />
        Self Hosting
      </label>
      <label>
        <input
          type="radio"
          value="XeroCode Hosting"
          checked={selectedHostingOption === 'XeroCode Hosting'}
          onChange={handleHostingOptionChange}
        />
        XeroCode Hosting
      </label>

      {showSubOptions && (
        <div>
          <h3>Select a sub-option:</h3>
          <label>
            <input type="radio" value="AWS" name="subOption" /> AWS
          </label>
          <label>
            <input type="radio" value="Github" name="subOption" /> Github
          </label>
        </div>
      )}

      <button onClick={handleSaveHostingOption}>Save Hosting Option</button>
    </div>
  );
};

export default HostingOptions;
