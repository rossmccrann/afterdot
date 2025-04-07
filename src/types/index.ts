// Editor related types
export interface EditorContent {
    text: string;             // Plain text content
    html: string;             // HTML content (from TipTap)
    wordCount: number;        // Word count
    characterCount: number;   // Character count
    isPristine: boolean;      // Whether the editor has been modified
  }

// Future use types (commented out until needed)
/*
export interface Sentence {
  id: string;               // Unique identifier
  text: string;             // Sentence text
  start: number;            // Start position in document
  end: number;              // End position in document
  length: number;           // Character length 
  complexity: number;       // Calculated complexity score
  type: SentenceType;       // Type classification
}

export type SentenceType = 'simple' | 'compound' | 'complex' | 'compound-complex';
*/