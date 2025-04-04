import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WhisperContainer, 
  WhisperText 
} from './WhisperPromptsStyles.ts';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';

interface WhisperPromptsProps {
  userText: string;
}

export const WhisperPrompts: React.FC<WhisperPromptsProps> = ({ userText }) => {
  const { analysis, getWhisperPrompt } = useAIAnalysis();
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // Set and cycle through whisper prompts
  useEffect(() => {
    if (userText.length > 30) {
      const intervalId = setInterval(() => {
        const prompt = getWhisperPrompt();
        
        if (prompt && prompt !== currentPrompt) {
          // Hide the current prompt
          setIsVisible(false);
          
          // Wait for animation, then update
          setTimeout(() => {
            setCurrentPrompt(prompt);
            setIsVisible(true);
            
            // Auto-hide after a few seconds
            setTimeout(() => {
              setIsVisible(false);
            }, 10000);
          }, 500);
        }
      }, 20000); // Check for new prompts every 20 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [userText, getWhisperPrompt, currentPrompt]);
  
  // Show initial prompt after user starts typing
  useEffect(() => {
    if (userText.length > 30 && !currentPrompt) {
      const initialPrompt = getWhisperPrompt();
      if (initialPrompt) {
        setCurrentPrompt(initialPrompt);
        setIsVisible(true);
        
        // Auto-hide after a few seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 10000);
      }
    }
  }, [userText, getWhisperPrompt, currentPrompt]);

  return (
    <AnimatePresence>
      {isVisible && currentPrompt && (
        <WhisperContainer
          as={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <WhisperText>{currentPrompt}</WhisperText>
        </WhisperContainer>
      )}
    </AnimatePresence>
  );
};
