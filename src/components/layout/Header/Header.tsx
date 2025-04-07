import React from "react";
import { HeaderContainer, Title, Subtitle } from "./HeaderStyles";

interface HeaderProps {
    title?: string,
    subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({ 
    title = 'Afterdot.', 
    subtitle = 'Learn from the greatest' 
  }) => {
    return (
      <HeaderContainer>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </HeaderContainer>
    );
  };