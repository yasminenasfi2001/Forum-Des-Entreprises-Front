import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../../services/candidature.service";
import {OffreService} from "../../services/offre.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import * as Tesseract from "tesseract.js";
import {TextToSpeechService} from "../../services/text-to-speech.service";



@Component({
  selector: 'app-detailscand',
  templateUrl: './detailscand.component.html',
  styleUrls: ['./detailscand.component.css']
})
export class DetailscandComponent implements OnInit{
  constructor(private ttsService: TextToSpeechService,private condidatureService:CandidatureService,private aroute: ActivatedRoute,private tokenStorageService: StorageService,private router:Router) {
  }
  id:any;
  cand:any;
  ngOnInit(): void {

    this.aroute.params.subscribe(data =>{
      this.id=this.aroute.snapshot.params['idCandidature'];
    })
    this.condidatureService.getByCandidatureId(this.id).subscribe(
      data=>{
        this.cand=data
        if (this.cand.status === 'Traitee') {
          this.generateSharedRoomLink();
        }
      }
    )
  }
  extractedText:any;
  detecterTexte(imageUrl: any) {
    Tesseract.recognize(
      imageUrl,
      'fra',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log('Texte détecté : ', text);
      this.extractedText = text;

    });
  }
  sharedRoomLink: any;
  showTextarea: boolean = false;
  generateSharedRoomLink(): void {
    const roomName = "Entretien" + this.id;
    this.sharedRoomLink = "https://meet.jit.si/" + roomName;
  }

  goToSharedRoom() {
    if (this.sharedRoomLink) {
      window.open(this.sharedRoomLink, "_blank");
    }
  }
  startSpeaking(): void {
    this.ttsService.speak(this.extractedText, 'fr-FR', 1);
  }

  stopSpeaking(): void {
    this.ttsService.stop();
  }
}
