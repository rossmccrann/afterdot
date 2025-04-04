import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';

export const ReferencePanelContainer = styled.div`
  background: rgba(255, 250, 240, 0.8);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.subtle};
  max-width: 300px;
  min-width: 250px;
`;

export const ReferenceTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.normal};
  font-weight: 500;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReferenceText = styled.div`
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.text};
  line-height: 1.6;
`;

export const ReferenceSentence = styled.span<{ $isRevealed: boolean }>`
  transition: ${theme.transitions.medium};
  opacity: ${props => props.$isRevealed ? 1 : 0.1};
  filter: blur(${props => props.$isRevealed ? 0 : '2px'});
`;

export const RevealButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.small};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: ${theme.transitions.short};
  
  &:hover {
    background: ${theme.colors.highlight};
  }
`;