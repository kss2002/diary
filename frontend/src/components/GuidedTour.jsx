import { useState, useEffect } from 'react';
import '../styles/GuidedTour.css';

const GuidedTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      element: '.calendar',
      content:
        'Select any date on the calendar to start writing your diary entry. Days will be color-coded based on your emotions.',
    },
    {
      element: '.emotion-selector',
      content: 'Choose an emotion that best represents how you feel today.',
    },
    {
      element: '.entry-content',
      content:
        'Write about your day and feelings in detail. Your entries are private and saved automatically.',
    },
  ];

  useEffect(() => {
    const tourShown = localStorage.getItem('tourShown');
    if (!tourShown) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('tourShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="guided-tour-overlay">
      <div className="guided-tour-content">
        <p>{steps[currentStep].content}</p>
        <div className="guided-tour-actions">
          <button onClick={handleClose} className="skip-btn">
            스킵
          </button>
          <button onClick={handleNext} className="next-btn">
            {currentStep === steps.length - 1 ? 'Got it!' : 'Next'}
          </button>
        </div>
        <div className="tour-progress">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${
                index === currentStep ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
