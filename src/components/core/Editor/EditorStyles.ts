import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.lg};
  width: 650px; /* Fixed width */
`;

export const EditorWrapper = styled.div`
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  background-color: ${theme.colors.surface};
  transition: all ${theme.transitions.normal};
  width: 100%;
  height: 500px; /* Fixed height */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex; /* Add flex display */
  flex-direction: column; /* Stack children vertically */
  
  /* Make the editor fill the wrapper completely */
  .ProseMirror-focused, .ProseMirror {
    flex-grow: 1; /* Fill available space */
    width: 100%;
    height: 100%;
    overflow-y: auto;
    outline: none;
    padding: ${theme.spacing.md};
    box-sizing: border-box; /* Include padding in width/height calculation */
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }
  
  /* For the editor content wrapper */
  .tiptap-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

export const EditorStats = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.muted};
  margin-top: ${theme.spacing.sm};
  text-align: right;
  padding-right: ${theme.spacing.sm};
`;