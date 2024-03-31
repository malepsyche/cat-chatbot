import { Request, Response } from 'express';
import openaiAssistantService from '@services/openai-assistant-service';

const get = async (req: Request, res: Response): Promise<any> => {
    res.send('/openaiAssistant works!'); 
}

const createAssistant = async (req: Request, res: Response): Promise<any> => {
  try {
    const assistant = await openaiAssistantService.createAssistant();
    return assistant;

  } catch (error) {
    console.error('Error in /openai/query: ', error);
    res.status(500).send('Server error');
  }
};

const sendMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const messageContent: string = req.query.messageContent as string;
        const assistant = await openaiAssistantService.createAssistant();
        const thread = await openaiAssistantService.createThread();
        const message = await openaiAssistantService.addMessageToThread(thread, messageContent);
        let run = await openaiAssistantService.createRun(thread, assistant);
        run = await openaiAssistantService.monitorRunObjectStatus(run);
        const messageArray = await openaiAssistantService.listThreadMessages(run);
        res.json({ "messageArray" : messageArray });

    } catch (error) {
      console.error('Error in /openai/query: ', error);
      res.status(500).send('Server error');
    }
  };



export default {
  get,
  createAssistant,
  sendMessage,
}