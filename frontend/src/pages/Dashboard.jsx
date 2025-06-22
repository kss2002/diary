import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Calendar from '../components/Calendar';
import DiaryEntry from '../components/DiaryEntry';
import GuidedTour from '../components/GuidedTour';
import { formatDate } from '../utils/dateUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const saveEntry = (date, emotion, content) => {
    const dateKey = formatDate(date);
    setEntries((prevEntries) => ({
      ...prevEntries,
      [dateKey]: { emotion, content },
    }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <h1>~~님의 감정 일기</h1>
      <div className="dashboard-content">
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          entries={entries}
        />
        <DiaryEntry
          date={selectedDate}
          initialEmotion={entries[formatDate(selectedDate)]?.emotion || ''}
          initialContent={entries[formatDate(selectedDate)]?.content || ''}
          onSave={saveEntry}
        />
      </div>
      <GuidedTour />
    </div>
  );
};

export default Dashboard;
