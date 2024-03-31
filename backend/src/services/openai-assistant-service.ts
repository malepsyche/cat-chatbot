import axios from 'axios';
import OpenAI from "openai";
import { Thread } from 'openai/resources/beta/threads/threads';
import { Assistant } from 'openai/resources/beta/assistants/assistants';
import { Run } from 'openai/resources/beta/threads/runs/runs';
import { MessageContent } from 'src/types/openai-assistant-types';
const openai = new OpenAI();

class openaiAssistantService {
    private openaiApiKey = process.env.OPENAI_API_KEY;

    async createAssistant(): Promise<any> {
        try {
            const assistant = await openai.beta.assistants.create({
                name: "Math Tutor",
                instructions: "You are a personal math tutor. Write and run code to answer math questions.",
                tools: [{ type: "code_interpreter" }],
                model: "gpt-4-turbo-preview"
            });
            
            console.log("Assistant: ", assistant);
            return assistant;
          
        } catch (error) {
            console.log(`Error in ${this.createAssistant.name}: `, error);
        }
    }

    async createThread(): Promise<any> {
        try {
            const thread = await openai.beta.threads.create();
            
            console.log("Thread: ", thread);
            return thread;

        } catch (error) {
            console.log(`Error in ${this.createThread.name}: `, error);
        }
    }

    async addMessageToThread(thread: Thread, messageContent: string): Promise<any> {
        try {
            const message = await openai.beta.threads.messages.create(
                thread.id,
                {
                  role: "user",
                  content: messageContent
                }
            );

            console.log("Message added to Thread: ", message);
            return message;

        } catch (error) {
            console.log(`Error in ${this.addMessageToThread.name}: `, error);
        }
    }

    async createRun(thread: Thread, assistant: Assistant): Promise<any> {
        try {
            let run = await openai.beta.threads.runs.create(
                thread.id,
                { 
                  assistant_id: assistant.id,
                  instructions: "Please address the user as Jane Doe. The user has a premium account."
                }
            );

            console.log("Run Data: ", run);
            return run;

        } catch (error) {
            console.log(`Error in ${this.createRun.name}: `, error);
        }
    }

    async monitorRunObjectStatus(run: Run): Promise<any> {
        try {
            while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
                run = await openai.beta.threads.runs.retrieve(
                  run.thread_id,
                  run.id
                );
            }

            console.log("Monitoring run object status: ", run);
            return run;

        } catch (error) {
            console.log(`Error in ${this.monitorRunObjectStatus.name}: `, error);
        }
    }

    async listThreadMessages(run: Run): Promise<any> {
        try {
            if (run.status === 'completed') {
                const messageArray: string[] = [];
                const messages = await openai.beta.threads.messages.list(run.thread_id);
                for (const message of messages.data.reverse()) {
                    if (message.content[0].type == "text") {
                        console.log("message: ", JSON.stringify(message.content[0].text.value));
                        console.log("\n");
                        messageArray.push(JSON.stringify(message.content[0].text.value));
                    }
                }

                return messageArray;
            } else {
                console.log(run.status);
            }

        } catch (error) {
            console.log(`Error in ${this.monitorRunObjectStatus.name}: `, error);
        }
    }



}

export default new openaiAssistantService();