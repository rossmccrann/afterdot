import { useState, useEffect } from 'react';
import { Sentence } from '../types/editor.types';

interface ComparisonResult {
  similarityScore: number;
  matchingStructures: Array<{
    userSentenceId: string;
    referenceSentenceId: string;
    similarityScore: number;
  }>;
}

export const useStructuralComparison = (
  userSentences: Sentence[],
  referenceSentences: Sentence[]
) => {
  const [comparison, setComparison] = useState<ComparisonResult>({
    similarityScore: 0,
    matchingStructures: []
  });
  
  useEffect(() => {
    if (userSentences.length === 0 || referenceSentences.length === 0) {
      return;
    }
    
    // Very simple structural comparison algorithm
    // In a real app, this would be done by the AI service
    const matchingStructures = userSentences.map(userSentence => {
      // Find the most similar reference sentence
      const matches = referenceSentences.map(refSentence => {
        // Compare based on length, complexity, and type
        const lengthDiff = Math.abs(userSentence.length - refSentence.length) / Math.max(userSentence.length, refSentence.length);
        const complexityDiff = Math.abs(userSentence.complexity - refSentence.complexity);
        const typeMatch = userSentence.type === refSentence.type ? 1 : 0;
        
        // Calculate similarity score (higher is better)
        const similarityScore = 1 - ((lengthDiff * 0.4) + (complexityDiff * 0.3) + ((1 - typeMatch) * 0.3));
        
        return {
          referenceSentenceId: refSentence.id,
          similarityScore
        };
      });
      
      // Get the best match
      const bestMatch = matches.reduce((best, current) => {
        return current.similarityScore > best.similarityScore ? current : best;
      }, { referenceSentenceId: '', similarityScore: 0 });
      
      return {
        userSentenceId: userSentence.id,
        ...bestMatch
      };
    });
    
    // Calculate overall similarity score
    const overallScore = matchingStructures.reduce((sum, match) => sum + match.similarityScore, 0) / matchingStructures.length;
    
    setComparison({
      similarityScore: overallScore,
      matchingStructures
    });
  }, [userSentences, referenceSentences]);
  
  return comparison;
};