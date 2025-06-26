import { useState, useEffect } from 'react';
import '../styles/DiaryEntry.css';

const DiaryEntry = ({ date, initialEmotion, initialContent, onSave }) => {
  const [emotion, setEmotion] = useState(initialEmotion || 'neutral');
  const [content, setContent] = useState(initialContent || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setEmotion(initialEmotion || 'neutral');
    setContent(initialContent || '');
    setIsSaved(false);
  }, [date, initialEmotion, initialContent]);

  const handleSave = () => {
    onSave(date, emotion, content);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('ko-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="diary-entry">
      <h2>{formatDateForDisplay(date)}</h2>

      <div className="emotion-selector">
        <h3>오늘 당신의 감정은?</h3>
        <div className="emotion-buttons">
          <button
            className={`emotion-btn ${emotion === 'happy' ? 'selected' : ''}`}
            onClick={() => setEmotion('happy')}
          >
            😊 행복해요
          </button>
          <button
            className={`emotion-btn ${emotion === 'sad' ? 'selected' : ''}`}
            onClick={() => setEmotion('sad')}
          >
            😢 슬퍼요
          </button>
          <button
            className={`emotion-btn ${emotion === 'angry' ? 'selected' : ''}`}
            onClick={() => setEmotion('angry')}
          >
            😠 화났어요
          </button>
          <button
            className={`emotion-btn ${emotion === 'neutral' ? 'selected' : ''}`}
            onClick={() => setEmotion('neutral')}
          >
            😐 그럭저럭
          </button>
        </div>
      </div>

      <div className="entry-content">
        <h3>다이어리</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 이런 일이 있었어..."
          rows={10}
        />
      </div>

      <div className="entry-actions">
        <button className="save-btn" onClick={handleSave}>
          작성완료
        </button>
        {isSaved && <span className="save-message">저장되었어요</span>}
      </div>
    </div>
  );
};

export default DiaryEntry;
