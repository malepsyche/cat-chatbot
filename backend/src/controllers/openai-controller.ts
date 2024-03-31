import { Request, Response } from 'express';
import openaiService from '@services/openai-service';

const get = async (req: Request, res: Response): Promise<any> => {
    res.send('/openai works!'); 
}

const callOpenaiApi = async (req: Request, res: Response): Promise<any> => {
  try {
    const messageContent: string = req.query.messageContent as string;
    const response = await openaiService.callOpenaiApi(messageContent);

  } catch (error) {
    console.error('Error in /openai/query: ', error);
    res.status(500).send('Server error');
  }
};

export default {
  get,
  callOpenaiApi,
}