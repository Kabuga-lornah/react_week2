import { useState } from 'react';
import './App.css';
import Profile from './insurance/Profile';
import Vehicle from './insurance/Vehicle';
import History from './insurance/History';
import Review from './insurance/Review';

function App() {
  const [currentStep, setCurrentStep] = useState('profile');
  const [formData, setFormData] = useState({
    profile: {},
    vehicle: {},
    history: {}
  });

  const updateFormData = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const goToNext = (step) => {
    setCurrentStep(step);
  };

  const goToPrev = () => {
    if (currentStep === 'vehicle') setCurrentStep('profile');
    else if (currentStep === 'history') setCurrentStep('vehicle');
    else if (currentStep === 'review') setCurrentStep('history');
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    
 
  };

  return (
    <div className="app-container">
      {currentStep === 'profile' && (
        <Profile 
          onNext={(data) => {
            updateFormData('profile', data);
            goToNext('vehicle');
          }} 
        />
      )}
      
      {currentStep === 'vehicle' && (
        <Vehicle 
          formData={formData}
          setFormData={setFormData}
          onNext={() => goToNext('history')}
          onPrev={goToPrev}
        />
      )}
      
      {currentStep === 'history' && (
        <History 
          formData={formData}
          setFormData={setFormData}
          onNext={() => goToNext('review')}
          onPrev={goToPrev}
        />
      )}
      
      {currentStep === 'review' && (
        <Review 
          formData={formData}
          onSubmit={handleSubmit}  
          onPrev={goToPrev}
        />
      )}
    </div>
  );
}

export default App;