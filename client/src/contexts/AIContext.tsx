import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { AIAnalysisResponse, AIContextType } from '../types/ai.types';
import { aiService } from '../services/aiService';

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  
  // Example whisper prompts
  const whisperPrompts = [
    "Try a vivid metaphor here.",
    "Consider using alliteration for rhythm.",
    "Try a short, sharp sentence for contrast.",
    "You could echo the original's pattern of adjectives.",
    "This might benefit from a longer, flowing clause."
  ];
  
  const analyzeText = useCallback(async (userText: string, referenceText: string) => {
    // Don't re-analyze too frequently
    const now = Date.now();
    if (now - lastUpdateTime < 5000) {
      return;
    }
    
    try {
      setIsAnalyzing(true);
      
      // Call AI service to analyze the text
      const result = await aiService.analyzeText({ userText, referenceText });
      
      setAnalysis(result);
      setLastUpdateTime(now);
    } catch (error) {
      console.error('Error analyzing text:', error);
      // Provide fallback analysis for UI
    } finally {
      setIsAnalyzing(false);
    }
  }, [lastUpdateTime]);
  
  const getWhisperPrompt = useCallback(() => {
    // Get a random whisper prompt
    return whisperPrompts[Math.floor(Math.random() * whisperPrompts.length)];
  }, []);
  
  return (
    <AIContext.Provider
      value={{
        analysis,
        isAnalyzing,
        lastUpdateTime,
        analyzeText,
        getWhisperPrompt
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};