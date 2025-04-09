import React, { useState, useEffect } from 'react';
import { RibbonContainer, RibbonText } from './ContextRibbonStyles.ts';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';

interface ContextRibbonProps {
  userText: string;
  referenceText: string;
}

export const ContextRibbon: React.FC<ContextRibbonProps> = ({ userText, referenceText }) => {
  const { analysis } = useAIAnalysis();
  const [currentInsight, setCurrentInsight] = useState<string>('');
  const [opacity, setOpacity] = useState<number>(0);
  
  // Sample insights to display when no AI insight is available
  const defaultInsights = [
    'Consider the rhythm of each sentence as you write.',
    'Notice how structure shapes your meaning.',
    'The original paragraph uses varied sentence lengths to create rhythm.',
    'Try to mimic the feeling, not just the structure.',
    'Pay attention to how punctuation creates pauses in your writing.',
  ];
  
  // Update the insight when analysis changes
  useEffect(() => {
    if (analysis?.contextInsight) {
      // Fade out current insight
      setOpacity(0);
      
      // Wait for fade out, then update
      setTimeout(() => {
        setCurrentInsight(analysis.contextInsight);
        setOpacity(1);
      }, 300);
    } else if (!currentInsight && userText.length > 0) {
      // If no insight yet but user is writing, show a default insight
      const randomInsight = defaultInsights[Math.floor(Math.random() * defaultInsights.length)];
      setCurrentInsight(randomInsight);
      setOpacity(1);
    }
  }, [analysis, userText, currentInsight]);
  
  // If user hasn't started typing yet, don't show the ribbon
  if (userText.length === 0) {
    return null;
  }
  
  return (
    <RibbonContainer>
      <RibbonText $opacity={opacity}>
        {currentInsight}
      </RibbonText>
    </RibbonContainer>
  );
};
