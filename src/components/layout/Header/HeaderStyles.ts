// src/components/layout/Header/HeaderStyles.ts
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const HeaderContainer = styled.header`
  padding: ${theme.spacing.lg} 0;
  margin-bottom: ${theme.spacing.lg};
  width: 100%;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSizes.xxxl};
  font-weight: 400;
  color: ${theme.colors.brand.primary};
  margin-bottom: ${theme.spacing.xs};
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  font-style: italic;
`;