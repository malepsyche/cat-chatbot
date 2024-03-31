import axios from 'axios';
import { OpenAIResponse } from 'src/types/openai-types';

class openaiService {
    private openaiApiKey = process.env.OPENAI_API_KEY;

    async callOpenaiApi(messageContent: string): Promise<any> {
        try {
            const response = await axios.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: messageContent}],
                temperature: 0.7,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
              });
              
              console.log(response.data);
              return response.data;
          
        } catch (error) {
            console.log('Error in callOpenAiApi: ', error);
        }
    }
}

export default new openaiService();