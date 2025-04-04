import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    font-size: 16px;
  }
  
  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.5s ease;
  }
  
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 500;
    line-height: 1.3;
  }
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.short};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
  
  ::selection {
    background-color: ${theme.colors.highlight};
  }
  
  .ProseMirror {
    height: 100%;
    outline: none;
    min-height: 60vh;
    padding: ${theme.spacing.lg};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.medium};
    line-height: 1.8;
    color: ${theme.colors.text};
    
    p {
      margin-bottom: 1.5em;
    }
    
    &:focus {
      outline: none;
    }
  }
`;