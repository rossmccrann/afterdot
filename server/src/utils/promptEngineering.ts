export const createPrompt = (userText: string, referenceText: string): string => {
    return `
  I want you to analyze the user's writing in comparison to the reference text, focusing on structural imitation rather than content.
  
  REFERENCE TEXT:
  """
  ${referenceText}
  """
  
  USER TEXT:
  """
  ${userText}
  """
  
  Please provide a JSON response with the following structure:
  {
    "sentenceAnalysis": [
      {
        "id": "sentence-0",
        "text": "The actual sentence text",
        "start": 0,
        "end": 45,
        "length": 45,
        "complexity": 0.7,
        "type": "simple | compound | complex | compound-complex"
      }
    ],
    "structuralComparison": {
      "similarityScore": 0.75,
      "matchingStructures": [
        {
          "userSentenceId": "sentence-0",
          "referenceSentenceId": "sentence-1",
          "similarityScore": 0.8
        }
      ]
    },
    "suggestedAnnotations": [
      {
        "sentenceId": "sentence-0",
        "text": "A gentle suggestion about structure or rhythm",
        "type": "feedback | whisper"
      }
    ],
    "contextInsight": "An overall observation about the writing's rhythm, structure, or style."
  }
  
  For the analysis, focus on:
  1. Sentence rhythm and structure (not meaning)
  2. Syntactic patterns and complexity
  3. Variation in sentence length and type
  4. Use of punctuation to create cadence
  5. Parallel constructions or repetitions
  
  Your annotations should be gentle, reflective suggestions rather than corrections.
  `;
  };
  