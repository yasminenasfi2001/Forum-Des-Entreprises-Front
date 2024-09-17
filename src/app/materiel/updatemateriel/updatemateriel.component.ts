import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterielService } from 'src/app/services/materiel.service';

@Component({
  selector: 'app-updatemateriel',
  templateUrl: './updatemateriel.component.html',
  styleUrls: ['./updatemateriel.component.css']
})
export class UpdatematerielComponent implements OnInit{
  id:any
  four:any={}
  constructor(
    private route : ActivatedRoute,
    private service : MaterielService,
    private router : Router,
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.materielDetails(this.id).subscribe(data =>

      this.four=data,
    )
  }
modify(){


this.service.updateMateriel(this.id,this.four).subscribe(
  data =>{this.four=data,this.router.navigate(['materiels'])}
)
}
}

