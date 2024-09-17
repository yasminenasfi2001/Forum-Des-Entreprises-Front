import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-updatesession',
  templateUrl: './updatesession.component.html',
  styleUrls: ['./updatesession.component.css']
})
export class UpdatesessionComponent implements OnInit{
  id:any
  four:any={}
  constructor(
    private route : ActivatedRoute,
    private service : SessionService,
    private router : Router,
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.sessionDetails(this.id).subscribe(data =>

      this.four=data,
    )
  }
modify(){
  const parsedDate = new Date(this.four.dateSession);
  if (!isNaN(parsedDate.getTime())) {

    const formattedDate = parsedDate.toISOString();
     this.four.dateSession = formattedDate;

this.service.updateSession(this.id,this.four).subscribe(
  data =>{this.four=data,this.router.navigate(['sessiona'])}
)
}
}
}
