import {User} from "./user.model";

export class Reclamation {
  idReclamation?:any;
  dateDeReclamation?:Date;
  titre?:String;
  description?:String;
  status?:Boolean;
  image?:String;
  user?:User;
}
