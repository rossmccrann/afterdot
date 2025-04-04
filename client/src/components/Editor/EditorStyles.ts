import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';

export const EditorContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const EditorWrapper = styled.div<{ $isAnalyzing: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.medium};
  box-shadow: ${theme.shadows.subtle};
  min-height: 70vh;
  
  .ProseMirror {
    flex: 1;
    
    p {
      transition: ${theme.transitions.medium};
    }
  }
  
  /* Subtle pulsing effect when AI is analyzing */
  ${props => props.$isAnalyzing && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: ${theme.colors.highlight};
      opacity: 0.05;
      border-radius: ${theme.borderRadius.md};
      animation: pulse 2s infinite;
      pointer-events: none;
    }
    
    @keyframes pulse {
      0% { opacity: 0.02; }
      50% { opacity: 0.08; }
      100% { opacity: 0.02; }
    }
  `}
`;