import { Component } from '@angular/core';
import {ChatbotService} from "../services/chatbot.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  prompt: string = '';
  response: string = '';
  constructor(private chatBotService: ChatbotService) { }

  onSubmit() {
    if (this.prompt.trim() === '') {
      this.error = 'Please enter a prompt.';
      return;
    }

    this.chatBotService.chat(this.prompt)
      .subscribe(
        response => {
          this.response = response;
          this.error = '';
        },
        error => {
          this.error = 'An error occurred. Please try again later.';
          this.response = '';
        }
      );
  }

  error: string = '';
}
