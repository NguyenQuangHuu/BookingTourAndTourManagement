import { Component , inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { ChatGemini } from '../../services/chat-gemini';

@Component({
  selector: 'app-chat-bot',
  imports: [FormsModule],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.css',
})
export class ChatBot {
  prompt= signal("")
  response= signal("");
  isLoading = signal(false)
  chatService = inject(ChatGemini)
  constructor() {}

  async sendToGemini() {
    if (!this.prompt) return;

    this.isLoading.update(x=>true);
    this.response.update(x=>''); // Reset câu trả lời cũ
    let response = await this.chatService.generateText(this.prompt())
    // Gọi service
    this.response.update(x=> response);
    
    this.isLoading.update(x=>false);
  }
}
