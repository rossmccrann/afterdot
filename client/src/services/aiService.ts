import { api } from './api';
import { AIAnalysisRequest, AIAnalysisResponse } from '../types/ai.types.ts';

// Mock AI analysis function for development
// This allows front-end work to continue without needing the backend
const mockAnalyzeText = (request: AIAnalysisRequest): Promise<AIAnalysisResponse> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Split user text into sentences
      const userSentences = request.userText.match(/[^.!?]+[.!?]+/g) || [];
      
      // Create mock sentence analysis
      const sentenceAnalysis = userSentences.map((text, index) => {
        const wordCount = text.split(/\s+/).length;
        const complexity = Math.min(wordCount * 0.05, 1);
        
        // Determine a mock sentence type
        let type: 'simple' | 'compound' | 'complex' | 'compound-complex' = 'simple';
        if (text.includes(';') || text.includes(':')) {
          type = 'compound-complex';
        } else if (text.includes(' but ') || text.includes(' and ') || text.includes(' or ')) {
          type = complexity > 0.6 ? 'compound-complex' : 'compound';
        } else if (text.includes(' which ') || text.includes(' that ') || text.includes(' who ')) {
          type = 'complex';
        }
        
        return {
          id: `sentence-${index}`,
          text: text.trim(),
          start: request.userText.indexOf(text),
          end: request.userText.indexOf(text) + text.length,
          length: text.length,
          complexity,
          type
        };
      });
      
      // Create mock matching structures (between user and reference)
      const matchingStructures = sentenceAnalysis.map((sentence, index) => {
        // For development, just create random matches with random scores
        return {
          userSentenceId: sentence.id,
          referenceSentenceId: `sentence-${Math.min(index, 2)}`,
          similarityScore: Math.random() * 0.5 + 0.3 // Random score between 0.3 and 0.8
        };
      });
      
      // Create mock suggested annotations
      const suggestedAnnotations = sentenceAnalysis.map((sentence, index) => {
        // Only suggest annotations for some sentences
        if (index % 2 === 0) {
          return {
            sentenceId: sentence.id,
            text: getRandomAnnotation(sentence.type),
            type: index % 4 === 0 ? 'whisper' : 'feedback'
          };
        }
        return null;
      }).filter(Boolean);
      
      // Create mock context insight
      const contextInsights = [
        "Your writing has a natural rhythm that's distinct from the reference.",
        "I notice you're using shorter sentences than the model. It creates a different pace.",
        "Your structural patterns echo the original while maintaining your voice.",
        "The cadence of your writing has a unique musicality to it.",
        "There's a pleasing balance between complexity and simplicity in your sentences."
      ];
      
      resolve({
        sentenceAnalysis,
        structuralComparison: {
          similarityScore: 0.65, // Random overall similarity score
          matchingStructures
        },
        suggestedAnnotations,
        contextInsight: contextInsights[Math.floor(Math.random() * contextInsights.length)]
      });
    }, 800); // Simulate API delay
  });
};

// Helper function to generate random annotations
const getRandomAnnotation = (sentenceType: string): string => {
  const annotations = {
    simple: [
      "This simple sentence provides contrast to your more complex structures.",
      "Short, direct sentences like this create impact.",
      "Consider adding a descriptive detail for texture."
    ],
    compound: [
      "This balanced compound structure mirrors the reference nicely.",
      "Try varying the rhythm with uneven clause lengths.",
      "The conjunction creates a natural pivot point in your thought."
    ],
    complex: [
      "Your subordinate clause adds depth to the main idea.",
      "The dependent clause creates a pleasing rhythm.",
      "This complex structure adds sophistication to your writing."
    ],
    'compound-complex': [
      "This intricate structure showcases your command of syntax.",
      "The multilayered sentence creates a distinctive rhythm.",
      "Your nested clauses echo the reference paragraph's complexity."
    ]
  };
  
  // Get annotations for the sentence type, or use simple as fallback
  const typeAnnotations = annotations[sentenceType as keyof typeof annotations] || annotations.simple;
  
  return typeAnnotations[Math.floor(Math.random() * typeAnnotations.length)];
};

export const aiService = {
  // Call the real API endpoint
  analyzeText: async (request: AIAnalysisRequest): Promise<AIAnalysisResponse> => {
    try {
      // In production, this would call the actual API
      // return api.post<AIAnalysisResponse>('/analysis', request);
      
      // For now, use the mock for development
      return await mockAnalyzeText(request);
    } catch (error) {
      console.error('Error in AI analysis:', error);
      throw error;
    }
  }
};