import { Editor } from '@tiptap/react';

export interface Sentence {
    id: string;
    text: string;
    start: number;
    end: number;
    length: number;
    complexity: number;
    type: 'simple' | 'complex' | 'compound' | 'compound-complex';
}

export interface ParagraphAnalysis {
    sentence: Sentence[];
    overallRythmn: number;
    varietyScore: number;
    dominantStructures: string[];
}

export interface EditorState {
    content: string;
    referenceConent: string;
    analysis: ParagraphAnalysis[] | null;
    isLoading: boolean;
    activeAnnotations: Annotation[];
}

export interface Annotation {
    id: string;
    sentencceId: string;
    text: string;
    position: {
        start: number;
        end: number;
    };
    type: 'feedback' | 'whisper' | 'highlight';
    opacity: number;
}

export interface EditorContextType {
    editor: Editor | null;
    state: EditorState;
    setReferenceContent: (content: string) => void;
    updateContent: (content: string) => void;
    addAnnotation: (annotation: Annotation) => void;
    removeAnnotation: (id: string) => void;
    fadeAnnotation: (id: string) => void;
}