import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';


export const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;1,300;1,400&family=IBM+Plex+Mono:wght@300;400&display=swap');
  
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
   margin: 0;
   padding: 0;
   display: block; /* Override the flex display from index.css */
   min-height: 100vh;
   width: 100%;
   background: ${theme.colors.background}
  }

  #root {
   min-height: 100vh;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    line-height: 1.3;
    color: ${theme.colors.text.primary};
  }
  
  a {
    color: ${theme.colors.brand.accent};
    text-decoration: none;
    transition: color ${theme.transitions.normal};
    
    &:hover {
      color: ${theme.colors.brand.primary};
    }
  }
  
  /* Selection styling */
  ::selection {
    background-color: ${theme.colors.feedback.info};
  }
  
  /* Focus outline for accessibility */
  :focus {
    outline: 2px solid ${theme.colors.brand.accent};
    outline-offset: 2px;
  }
  
  .tiptap {
    width: 100%;
    height: 100%;
  }

  /* TipTap editor specific styles */
  .ProseMirror {
    height: 100%;
    min-height: 200px;
    padding: ${theme.spacing.md};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.lg};
    line-height: 1.8;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.sm};
    transition: box-shadow ${theme.transitions.normal};
    text-align: left;
    
    &:focus {
      outline: none;
      box-shadow: ${theme.shadows.md};
    }
    
    p {
      margin-bottom: 1em;
    }
    
    p:last-child {
      margin-bottom: 0;
    }
  }
`;