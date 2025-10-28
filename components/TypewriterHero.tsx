'use client';

import { useEffect, useState } from 'react';

export function TypewriterHero() {
  const [currentText, setCurrentText] = useState('');

  const fullText = 'Turn meetings into launch stories';
  const grayPart = 'Turn meetings into ';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  const grayPortion = currentText.substring(0, Math.min(currentText.length, grayPart.length));
  const bluePortion = currentText.substring(grayPart.length);
  
  return (
    <h1 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
      <span className="text-gray-900">{grayPortion}</span>
      <span className="text-blue-600">{bluePortion}</span>
    </h1>
  );
}

