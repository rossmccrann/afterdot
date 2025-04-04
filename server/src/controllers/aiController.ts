import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { openaiService } from 'services/openaiService';
import { AIAnalysisRequest } from 'types';

const analyzeText: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const analysisRequest: AIAnalysisRequest = req.body;

    if (!analysisRequest.userText || !analysisRequest.referenceText) {
      res.status(400).json({
        error: 'Bad request',
        message: 'Both userText and referenceText are required',
      });
      return;
    }

    const analysisResult = await openaiService.analyzeWriting(
      analysisRequest.userText,
      analysisRequest.referenceText
    );

    res.json(analysisResult);
  } catch (error) {
    next(error);
  }
};

export { analyzeText };