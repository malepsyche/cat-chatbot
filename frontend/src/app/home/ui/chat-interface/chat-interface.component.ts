import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../../services/openai/openai.service';
import { CatService } from '../../../services/cat/cat.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
	imageUrl?: string;
}

@Component({
  selector: 'app-chat-interface',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss'],
})

export class ChatInterfaceComponent implements OnInit, AfterViewChecked {
  
	@ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;
  
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private openaiService: OpenaiService, private catService: CatService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
			if (this.scrollContainer) {
				this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
			}    
		} catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

	async sendMessage(): Promise<void> {
		try {
			const tempMessage = this.newMessage;
			this.newMessage = '';
			const userMessage: Message = { text: tempMessage, sender: 'user' };
			this.messages.push(userMessage);

			if (tempMessage.toLowerCase().includes("show") && tempMessage.toLowerCase().includes("cat")) {
				const imageUrls: string[] = await this.catService.getBotResponse(tempMessage);
				imageUrls.forEach((imageUrl) => {
					this.messages.push({
						text: 'Here is a cat:', 
						sender: 'bot',
						imageUrl: imageUrl
					});
				});
			}

			else {
				const messageArray: string[] = await this.openaiService.getBotResponse(tempMessage);
				const botMessages = messageArray.slice(1) // remove user input from array
				botMessages.forEach((message) => { 
					this.messages.push({ text: JSON.parse(message), sender: 'bot' });
				});
			}

		} catch (error) {
			console.error('Error:', error);
		}
	}
}






// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { CommonModule, NgFor } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// interface Message {
// 	text: string;
// 	sender: 'user' | 'bot';
// }

// @Component({
// 	selector: 'app-chat-interface',
// 	standalone: true,
// 	imports: [CommonModule, NgFor, FormsModule],
// 	templateUrl: './chat-interface.component.html',
// 	styleUrls: ['./chat-interface.component.scss'],
// })
// export class ChatInterfaceComponent implements OnInit {
// 	messages: Message[] = [];
// 	newMessage: string = '';

// 	constructor(private http: HttpClient) {}

// 	ngOnInit(): void {}

//   	sendMessage(): void {
// 		const userMessage: Message = { text: this.newMessage, sender: 'user' };
// 		this.messages.push(userMessage);
// 		const params = new HttpParams().set('messageContent', this.newMessage);
// 		this.newMessage = ''; 
// 		this.http.get<{ messageArray: string[] }>('http://localhost:3001/openaiAssistant/sendMessage', { params })
// 		.subscribe({
// 		next: (response) => {
// 			const botMessages: string[] = response.messageArray.slice(1);	// remove user input from array
// 			botMessages.forEach((message) => {
// 				this.messages.push({ text: JSON.parse(message), sender: 'bot' });
// 			});
// 		},
// 		error: (error) => {
// 			console.error('Error:', error);
// 		}
// 		});
//   }
// }







