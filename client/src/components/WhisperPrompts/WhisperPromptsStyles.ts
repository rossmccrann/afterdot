import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';

export const WhisperContainer = styled.div`
  position: absolute;
  right: ${theme.spacing.lg};
  bottom: 100px;
  max-width: 250px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.subtle};
  backdrop-filter: blur(5px);
`;

export const WhisperText = styled.div`
  font-family: ${theme.fonts.body};
  font-style: italic;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.promptText};
  line-height: 1.5;
`;