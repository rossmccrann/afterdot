import { useState, useEffect } from 'react';
import { Sentence } from '../types/editor.types';

export const useSentenceRhythm = (text: string) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  
  useEffect(() => {
    if (!text) {
      setSentences([]);
      return;
    }
    
    // Simple sentence parsing logic
    const sentenceRegex = /[^.!?]+[.!?]+/g;
    const parsedSentences: Sentence[] = [];
    let match;
    let index = 0;
    
    while ((match = sentenceRegex.exec(text)) !== null) {
      const sentenceText = match[0].trim();
      const start = match.index;
      const end = start + sentenceText.length;
      
      // Calculate simple complexity based on length and punctuation
      const wordCount = sentenceText.split(/\s+/).length;
      const commaCount = (sentenceText.match(/,/g) || []).length;
      const semicolonCount = (sentenceText.match(/;/g) || []).length;
      
      // More punctuation and words = more complex
      const complexity = Math.min(
        (wordCount * 0.05) + (commaCount * 0.1) + (semicolonCount * 0.2),
        1
      );
      
      // Determine sentence type
      let type: 'simple' | 'compound' | 'complex' | 'compound-complex' = 'simple';
      
      if (semicolonCount > 0 || sentenceText.includes(':')) {
        type = 'compound-complex';
      } else if (sentenceText.includes(' but ') || sentenceText.includes(' and ') || sentenceText.includes(' or ')) {
        if (sentenceText.includes(' which ') || sentenceText.includes(' that ') || sentenceText.includes(' who ')) {
          type = 'compound-complex';
        } else {
          type = 'compound';
        }
      } else if (sentenceText.includes(' which ') || sentenceText.includes(' that ') || sentenceText.includes(' who ')) {
        type = 'complex';
      }
      
      parsedSentences.push({
        id: `sentence-${index}`,
        text: sentenceText,
        start,
        end,
        length: sentenceText.length,
        complexity,
        type
      });
      
      index++;
    }
    
    setSentences(parsedSentences);
  }, [text]);
  
  return { sentences };
};
