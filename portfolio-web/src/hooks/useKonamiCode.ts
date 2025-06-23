import { useEffect, useState, useCallback } from 'react';

const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const useKonamiCode = (callback: () => void) => {
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    setKeySequence((prevSequence) => {
      const newSequence = [...prevSequence, event.key].slice(-konamiCode.length);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        callback();
      }
      
      return newSequence;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};