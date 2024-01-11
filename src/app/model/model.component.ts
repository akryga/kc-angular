import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit{
  mdls: any[] = [];
  //"{{gateway}}/rb/v1/tasks?page=0&size=10"

  constructor( private http: HttpClient, 
    private readonly keycloak: KeycloakService ) {
  }
  ngOnInit(): void {
    this.refreshModels();
  }

  async refreshModels() {
    
    const token = await this.keycloak.getToken();    //console.log(token);
    ///query/v1/process-instances?page=0&size=20
    const response = await fetch('/rb/v1/process-definitions', {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(data => data.json())
    //.then(js => { this.pss = (<any[]>js.list.entries).flatMap(a => a.entry ) })
    .then( js => js.list.entries)
    .then( entries => this.mdls = (<any[]>entries).flatMap(a => a.entry ))
    .catch(err => console.error(err));
  }
}

const model = {
  "appVersion": "1",
  "appName": "default-app",
  "serviceName": "rb",
  "serviceFullName": "rb",
  "serviceType": "runtime-bundle",
  "serviceVersion": "",
  "id": "5a3da662-9b07-11ee-84bc-0242ac130006",
  "name": "ThrowCatchMessageIT_Process3",
  "key": "ThrowCatchMessageIT_Process1",
  "version": 1,
};