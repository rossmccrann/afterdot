// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';
import { Header } from './components/layout/Header';
import { Editor } from './components/core/Editor';
import { EditorContent } from './types';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [editorContent, setEditorContent] = useState<EditorContent>({
    text: '',
    html: '',
    wordCount: 0,
    characterCount: 0,
    isPristine: true
  });

  const handleEditorChange = (content: EditorContent) => {
    setEditorContent(content);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <ContentContainer>
          <Header />
          <Editor onChange={handleEditorChange} />
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;