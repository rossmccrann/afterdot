import { Sentence } from "./editor.types";


export interface AIAnalysisRequest {
    userText: string;
    referenceText: string;
  }
  
  export interface AIAnalysisResponse {
    sentenceAnalysis: Sentence[];
    structuralComparison: {
      similarityScore: number;
      matchingStructures: Array<{
        userSentenceId: string;
        referenceSentenceId: string;
        similarityScore: number;
      }>;
    };
    suggestedAnnotations: Array<{
      sentenceId: string;
      text: string;
      type: 'feedback' | 'whisper';
    }>;
    contextInsight: string; // For the context ribbon
  }
  
  export interface AIContextType {
    analysis: AIAnalysisResponse | null;
    isAnalyzing: boolean;
    lastUpdateTime: number;
    analyzeText: (userText: string, referenceText: string) => Promise<void>;
    getWhisperPrompt: () => string | null;
  }