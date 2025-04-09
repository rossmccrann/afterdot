import styled from 'styled-components';
import { theme } from '../../assets/styles/theme';

export const PulseLineContainer = styled.div`
  width: 100%;
  height: 30px;
  padding: ${theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PulseLineTrack = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: rgba(123, 140, 148, 0.2);
`;

export const PulsePoint = styled.div<{ $size: number; $color: string; $position: number }>`
  position: absolute;
  width: ${props => props.$size * 6}px;
  height: ${props => props.$size * 6}px;
  border-radius: 50%;
  background: ${props => props.$color};
  top: 50%;
  left: ${props => props.$position}%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  opacity: 0.6;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;