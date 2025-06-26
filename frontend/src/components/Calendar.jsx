import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import MonthSelector from './MonthSelector';
import '../styles/Calendar.css';

const Calendar = ({ selectedDate, onDateSelect, entries }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    'default',
    { month: 'long' }
  );

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setIsMonthSelectorOpen(false);
  };

  const getDayClass = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = formatDate(date);
    const isSelected =
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    let classes = 'calendar-day';
    if (isSelected) classes += ' selected';

    if (entries[dateStr]?.emotion) {
      classes += ` emotion-${entries[dateStr].emotion}`;
    }

    return classes;
  };

  const handleDayClick = (day) => {
    onDateSelect(new Date(currentYear, currentMonth, day));
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={getDayClass(day)}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={previousMonth}>
          <ChevronLeft size={20} />
        </button>
        <h2
          onClick={() => setIsMonthSelectorOpen(true)}
          className="month-year-selector"
        >
          {monthName} {currentYear}
        </h2>
        <button className="calendar-nav-btn" onClick={nextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="calendar-weekdays">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div className="calendar-days">{renderCalendarDays()}</div>
      <div className="emotion-legend">
        <div className="legend-item">
          <span className="legend-color emotion-happy"></span>
          <span>행복해요</span>
        </div>
        <div className="legend-item">
          <span className="legend-color emotion-sad"></span>
          <span>슬퍼요</span>
        </div>
        <div className="legend-item">
          <span className="legend-color emotion-angry"></span>
          <span>화났어요</span>
        </div>
        <div className="legend-item">
          <span className="legend-color emotion-neutral"></span>
          <span>그럭저럭</span>
        </div>
      </div>
      <MonthSelector
        isOpen={isMonthSelectorOpen}
        onClose={() => setIsMonthSelectorOpen(false)}
        onSelect={handleMonthSelect}
        currentYear={currentYear}
      />
    </div>
  );
};

export default Calendar;
