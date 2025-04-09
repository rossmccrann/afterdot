import React, { useState, useEffect } from 'react';
import { 
  ReferencePanelContainer, 
  ReferenceTitle, 
  ReferenceText,
  ReferenceSentence,
  RevealButton } from './ReferencePanelStyles.ts';
import { useAIAnalysis } from '../../hooks/useAIAnalysis.ts';

interface ReferencePanelProps {
  referenceText: string;
  userText: string;
}

export const ReferencePanel: React.FC<ReferencePanelProps> = ({ referenceText, userText }) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [sentences, setSentences] = useState<string[]>([]);
  const [revealedSentences, setRevealedSentences] = useState<number[]>([]);
  const { analysis } = useAIAnalysis();
  
  // Parse the reference text into sentences
  useEffect(() => {
    if (referenceText) {
      // Simple sentence splitting logic - can be improved with NLP
      const sentenceRegex = /[^.!?]+[.!?]+/g;
      const parsedSentences = [];
      let match;
      
      while ((match = sentenceRegex.exec(referenceText)) !== null) {
        parsedSentences.push(match[0].trim());
      }
      
      setSentences(parsedSentences);
    }
  }, [referenceText]);
  
  // Gradually reveal sentences based on structural similarity
  useEffect(() => {
    if (analysis?.structuralComparison?.matchingStructures) {
      const matchingStructures = analysis.structuralComparison.matchingStructures;
      
      // Find reference sentences that match user sentences
      const newRevealedSentences = matchingStructures
        .filter(match => match.similarityScore > 0.7) // Only reveal if there's a good match
        .map(match => parseInt(match.referenceSentenceId.replace('sentence-', ''), 10));
      
      setRevealedSentences(prevRevealed => {
        const combined = [...prevRevealed, ...newRevealedSentences];
        return [...new Set(combined)]; // Remove duplicates
      });
    }
  }, [analysis]);

  return (
    <ReferencePanelContainer>
      <ReferenceTitle>
        Reference Paragraph
        <RevealButton onClick={() => setIsRevealed(!isRevealed)}>
          {isRevealed ? 'Hide' : 'Reveal'}
        </RevealButton>
      </ReferenceTitle>
      
      <ReferenceText>
        {sentences.map((sentence, index) => (
          <ReferenceSentence 
            key={`ref-sentence-${index}`}
            $isRevealed={isRevealed || revealedSentences.includes(index)}
          >
            {sentence}
          </ReferenceSentence>
        ))}
      </ReferenceText>
    </ReferencePanelContainer>
  );
};