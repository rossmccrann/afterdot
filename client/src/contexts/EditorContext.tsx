import React, { createContext, useState, useContext, ReactNode } from 'react';
import { EditorState, EditorContextType, Annotation } from '../types/editor.types';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid @types/uuid

const defaultEditorState: EditorState = {
  content: '',
  referenceContent: '',
  analysis: null,
  isLoading: false,
  activeAnnotations: []
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editor, setEditor] = useState<any>(null);
  const [state, setState] = useState<EditorState>(defaultEditorState);
  
  const setReferenceContent = (content: string) => {
    setState(prev => ({ ...prev, referenceContent: content }));
  };
  
  const updateContent = (content: string) => {
    setState(prev => ({ ...prev, content }));
  };
  
  const addAnnotation = (annotation: Omit<Annotation, 'id'>) => {
    const newAnnotation = { ...annotation, id: uuidv4() };
    setState(prev => ({
      ...prev,
      activeAnnotations: [...prev.activeAnnotations, newAnnotation]
    }));
  };
  
  const removeAnnotation = (id: string) => {
    setState(prev => ({
      ...prev,
      activeAnnotations: prev.activeAnnotations.filter(a => a.id !== id)
    }));
  };
  
  const fadeAnnotation = (id: string, opacity: number) => {
    setState(prev => ({
      ...prev,
      activeAnnotations: prev.activeAnnotations.map(a => 
        a.id === id ? { ...a, opacity } : a
      )
    }));
  };
  
  return (
    <EditorContext.Provider
      value={{
        editor,
        state,
        setReferenceContent,
        updateContent,
        addAnnotation,
        removeAnnotation,
        fadeAnnotation
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};