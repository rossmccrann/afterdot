export interface AIAnalysisRequest {
    userText: string;
    referenceText: string;
  }
  
  export interface Sentence {
    id: string;
    text: string;
    start: number;
    end: number;
    length: number;
    complexity: number;
    type: 'simple' | 'compound' | 'complex' | 'compound-complex';
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
    contextInsight: string;
  }