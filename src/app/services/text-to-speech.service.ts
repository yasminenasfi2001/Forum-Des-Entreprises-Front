import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text: string, voiceName?: string, rate?: number): void {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceName) {
      const voices = this.synth.getVoices();
      const selectedVoice = voices.find(voice => voice.name === voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    if (rate) {
      utterance.rate = rate;
    }
    this.synth.speak(utterance);
  }

  stop(): void {
    this.synth.cancel();
  }

}
