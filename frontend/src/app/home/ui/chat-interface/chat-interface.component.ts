import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Message {
	text: string;
	sender: 'user' | 'bot';
}

@Component({
	selector: 'app-chat-interface',
	standalone: true,
	imports: [CommonModule, NgFor, FormsModule],
	templateUrl: './chat-interface.component.html',
	styleUrls: ['./chat-interface.component.scss'],
})
export class ChatInterfaceComponent implements OnInit {
	messages: Message[] = [];
	newMessage: string = '';

	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

  	sendMessage(): void {
		const userMessage: Message = { text: this.newMessage, sender: 'user' };
		this.messages.push(userMessage);
		const params = new HttpParams().set('messageContent', this.newMessage);
		this.newMessage = ''; 
		this.http.get<{ messageArray: string[] }>('http://localhost:3001/openaiAssistant/sendMessage', { params })
		.subscribe({
		next: (response) => {
			const botMessages: string[] = response.messageArray.slice(1);	// remove user input from array
			botMessages.forEach((message) => {
				this.messages.push({ text: JSON.parse(message), sender: 'bot' });
			});
		},
		error: (error) => {
			console.error('Error:', error);
		}
		});
  }
}
