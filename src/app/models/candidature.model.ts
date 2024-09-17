import {Status} from "./status.enum";
import {User} from "./user.model";
import {Offre} from "./offre.model";

export class Candidature {
  idCandidature?:any;
    lettreDeMotivation?:String;
    experience?:String;
    formation?:String;
    competence?:String;
    langues?:String;
    dateDeCandidature?:Date;
    dateDeMiseEnTrt?:Date;
    datedeRefus?:Date;
    dateDAcceptance?:Date;
    remarque?:String;
    status?:Status;
    user?:User;
    offre?:Offre;
}
