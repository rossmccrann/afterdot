import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './assets/styles/globalStyles.ts';
import { theme } from './assets/styles/theme';
import WritingStudio from './pages/WritingStudio.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<WritingStudio />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;

