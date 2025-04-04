import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../assets/styles/theme';
import { Editor } from '../components/Editor/Editor';
import { ContextRibbon } from '../components/ContextRibbon/ContextRibbon';
import { ReferencePanel } from '../components/ReferencePanel/ReferencePanel';
import { PulseLine } from '../components/PulseLine/PulseLine';
import { WhisperPrompts } from '../components/WhisperPrompts/WhisperPrompts.tsx';
import { AIProvider } from '../contexts/AIContext';
import { EditorProvider } from '../contexts/EditorContext';

const WritingStudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${theme.colors.background};
`;

const StudioContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  overflow: auto;
`;

const SidePanel = styled.div`
  width: 300px;
  padding: ${theme.spacing.lg};
  border-left: 1px solid rgba(123, 140, 148, 0.1);
  background: rgba(255, 250, 240, 0.5);
  overflow: auto;
`;

const Header = styled.header`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid rgba(123, 140, 148, 0.1);
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 400;
  color: ${theme.colors.primary};
`;

const WritingStudio: React.FC = () => {
  const [userText, setUserText] = useState<string>('');
  
  // Sample reference texts - in a real app these would come from a database or API
  const sampleReferences = [
    {
      id: 'fitzgerald',
      author: 'F. Scott Fitzgerald',
      text: 'So we beat on, boats against the current, borne back ceaselessly into the past. For a transitory enchanted moment man must have held his breath in the presence of this continent, compelled into an aesthetic contemplation he neither understood nor desired, face to face for the last time in history with something commensurate to his capacity for wonder.'
    },
    {
      id: 'hemingway',
      author: 'Ernest Hemingway',
      text: 'The old man was thin and gaunt with deep wrinkles in the back of his neck. The brown blotches of the benevolent skin cancer the sun brings from its reflection on the tropic sea were on his cheeks. The blotches ran well down the sides of his face and his hands had the deep-creased scars from handling heavy fish on the cords.'
    },
    {
      id: 'dickens',
      author: 'Charles Dickens',
      text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.'
    }
  ];
  
  // Select a reference text for the session
  const [referenceText, setReferenceText] = useState<string>(sampleReferences[0].text);
  
  const handleContentChange = (content: string) => {
    setUserText(content);
  };

  return (
    <AIProvider>
      <EditorProvider>
        <WritingStudioContainer>
          <Header>
            <Title>Afterdot.</Title>
          </Header>
          
          <ContextRibbon 
            userText={userText} 
            referenceText={referenceText} 
          />
          
          <StudioContent>
            <SidePanel>
              <ReferencePanel 
                referenceText={referenceText}
                userText={userText}
              />
            </SidePanel>
            
            <MainArea>
              <Editor 
                referenceText={referenceText}
                onContentChange={handleContentChange}
              />
              <WhisperPrompts userText={userText} />
            </MainArea>
          </StudioContent>
          
          <PulseLine userText={userText} />
        </WritingStudioContainer>
      </EditorProvider>
    </AIProvider>
  );
};

export default WritingStudio;