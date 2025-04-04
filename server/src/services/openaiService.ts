import OpenAI from 'openai';
import { AIAnalysisResponse } from '../types/index';
import { createPrompt } from '../utils/promptEngineering';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const openaiService = {
  analyzeWriting: async (
    userText: string,
    referenceText: string
  ): Promise<AIAnalysisResponse> => {
    try {
      // Create prompt for OpenAI
      const prompt = createPrompt(userText, referenceText);
      
      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a literary analysis AI specialized in structural imitation. You analyze how well a user\'s writing imitates the structure, rhythm, and syntax of a reference text while maintaining original content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });
      
      // Parse the response
      const analysisText = response.choices[0]?.message?.content || '{}';
      const analysis = JSON.parse(analysisText) as AIAnalysisResponse;
      
      return analysis;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to analyze writing');
    }
  }
};