import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-activiti-app',
  templateUrl: './activiti-app.component.html',
  styleUrls: ['./activiti-app.component.css']
})
export class ActivitiAppComponent  implements OnInit{
  apss: any[] = [];
  //"{{gateway}}/rb/v1/tasks?page=0&size=10"
  panelOpenState: boolean = false;
  constructor( private http: HttpClient, 
    private readonly keycloak: KeycloakService ) {
  }
  ngOnInit(): void {
    this.refreshApss();
  }

  async refreshApss() {
    
    const token = await this.keycloak.getToken();    //console.log(token);
    ///query/v1/process-instances?page=0&size=20
    const response = await fetch('/query/v1/applications', {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(data => data.json())
    //.then(js => { this.pss = (<any[]>js.list.entries).flatMap(a => a.entry ) })
    .then( js => js.list.entries)
    .then( entries => this.apss = (<any[]>entries).flatMap(a => a.entry ))
    .catch(err => console.error(err));
  }
}