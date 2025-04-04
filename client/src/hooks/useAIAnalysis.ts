import { useState, useCallback, useEffect, useRef } from 'react';
import { AIAnalysisResponse } from '../types/ai.types.ts';
import { aiService } from '../services/aiService.ts';

export const useAIAnalysis = () => {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>('');
  const [referenceText, setReferenceText] = useState<string>('');
  
  // Use a ref to track debounce timeout
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Sample whisper prompts
  const whisperPrompts = [
    "Try a vivid metaphor here.",
    "Consider using alliteration for rhythm.",
    "Try a short, sharp sentence for contrast.",
    "You could echo the original's pattern of adjectives.",
    "This might benefit from a longer, flowing clause.",
    "Try repeating a key word for emphasis.",
    "Consider using a semicolon to connect related ideas.",
    "A rhetorical question might work well here.",
    "This feels like a good spot for a revealing detail.",
    "Consider ending with a powerful one-word sentence."
  ];
  
  // Get a random whisper prompt
  const getWhisperPrompt = useCallback(() => {
    if (whisperPrompts.length === 0) {
      return null;
    }
    return whisperPrompts[Math.floor(Math.random() * whisperPrompts.length)];
  }, []);

  // Debounced analysis function
  const analyzeText = useCallback((userText: string, refText: string) => {
    // Store current text to prevent unnecessary API calls
    setCurrentText(userText);
    setReferenceText(refText);
    
    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Set a new timeout
    debounceTimeout.current = setTimeout(async () => {
      // Don't analyze if the text is too short
      if (userText.length < 15) {
        return;
      }
      
      // Don't re-analyze if the text hasn't changed
      const now = Date.now();
      if (now - lastUpdateTime < 5000) {
        return;
      }
      
      try {
        setIsAnalyzing(true);
        
        // Call AI analysis service
        const result = await aiService.analyzeText({ userText, referenceText: refText });
        
        setAnalysis(result);
        setLastUpdateTime(now);
      } catch (error) {
        console.error('Error analyzing text:', error);
        
        // Provide a basic fallback analysis if the service fails
        // This ensures the UI still works even without AI
        setAnalysis({
          sentenceAnalysis: [
            {
              id: 'sentence-0',
              text: userText,
              start: 0,
              end: userText.length,
              length: userText.length,
              complexity: 0.5,
              type: 'simple'
            }
          ],
          structuralComparison: {
            similarityScore: 0.5,
            matchingStructures: []
          },
          suggestedAnnotations: [],
          contextInsight: 'Keep writing. Your unique voice is emerging.'
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 1000); // Debounce for 1 second
  }, [lastUpdateTime]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    analysis,
    isAnalyzing,
    lastUpdateTime,
    analyzeText,
    getWhisperPrompt
  };
};