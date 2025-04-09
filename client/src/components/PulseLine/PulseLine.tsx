import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PulseLineContainer, 
  PulseLineTrack,
  PulsePoint
} from './PulseLineStyles';
import { useSentenceRhythm } from '../../hooks/useSentenceRhythm.ts';
import { theme } from '../../assets/styles/theme.ts';

interface PulseLineProps {
  userText: string;
}

export const PulseLine: React.FC<PulseLineProps> = ({ userText }) => {
  const { sentences } = useSentenceRhythm(userText);
  const [pulses, setPulses] = useState<Array<{ id: string; size: number; position: number; color: string }>>([]);
  
  // Update pulses when sentences change
  useEffect(() => {
    if (sentences.length > 0) {
      const containerWidth = 100; // In percentage
      const availableSpace = containerWidth - 5; // Leave some margin
      const spaceBetween = availableSpace / Math.max(sentences.length - 1, 1);
      
      const newPulses = sentences.map((sentence, index) => {
        // Calculate pulse size based on sentence length and complexity
        const size = Math.min(Math.max(sentence.length / 50, 0.5), 2);
        
        // Position each pulse point along the track
        const position = index * spaceBetween;
        
        // Determine color based on sentence type
        let color;
        switch (sentence.type) {
          case 'simple':
            color = theme.colors.secondary;
            break;
          case 'compound':
            color = theme.colors.primary;
            break;
          case 'complex':
          case 'compound-complex':
            color = theme.colors.accent;
            break;
          default:
            color = theme.colors.secondary;
        }
        
        return {
          id: sentence.id,
          size,
          position,
          color
        };
      });
      
      setPulses(newPulses);
    }
  }, [sentences]);

  return (
    <PulseLineContainer>
      <PulseLineTrack>
        {pulses.map((pulse) => (
          <PulsePoint
            as={motion.div}
            key={pulse.id}
            $size={pulse.size}
            $color={pulse.color}
            $position={pulse.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 15 
            }}
          />
        ))}
      </PulseLineTrack>
    </PulseLineContainer>
  );
};