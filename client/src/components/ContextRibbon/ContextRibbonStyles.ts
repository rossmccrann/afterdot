import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';

export const RibbonContainer = styled.div`
  position: relative;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: linear-gradient(
    to right,
    rgba(208, 200, 176, 0.1),
    rgba(123, 140, 148, 0.05)
  );
  border-bottom: 1px solid rgba(123, 140, 148, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const RibbonText = styled.div<{ $opacity: number }>`
  font-family: ${theme.fonts.body};
  font-style: italic;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.primary};
  text-align: center;
  max-width: 800px;
  opacity: ${props => props.$opacity};
  transition: opacity 0.3s ease;
`;