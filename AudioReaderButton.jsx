import React, { useState } from 'react';
import { Volume2, VolumeX, Check } from 'lucide-react';

export default function AudioReaderButton({ textToRead, label = 'Listen to this section' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95; // Slightly slower, calm cadence
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={handleToggleSpeak}
      className="btn-outline btn-pill"
      style={{
        fontSize: '0.8rem',
        padding: '0.25rem 0.65rem',
        gap: '0.35rem',
        color: isPlaying ? 'var(--color-primary)' : 'var(--color-text-muted)',
        backgroundColor: isPlaying ? 'var(--color-mint-light)' : 'transparent'
      }}
      title={isPlaying ? 'Stop listening' : label}
      aria-label={isPlaying ? 'Stop audio narration' : label}
    >
      {isPlaying ? (
        <>
          <VolumeX size={15} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span>Stop audio</span>
        </>
      ) : (
        <>
          <Volume2 size={15} aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
