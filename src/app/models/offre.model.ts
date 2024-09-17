import {User} from "./user.model";

export class Offre {
  idOffre?:any;
  intitule?:String;
  image?:String;
  description?:String;
  dateDeCreation?:Date;
  nbPlaces?:number;
  averageReview?:number;
  qrcode?:String;
  user?:User;
  reviews?:any;
}
