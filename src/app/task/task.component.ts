import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tss: any[] = [];
  //"{{gateway}}/rb/v1/tasks?page=0&size=10"

  constructor( private http: HttpClient, 
    private readonly keycloak: KeycloakService ) {
  }
  ngOnInit(): void {
    this.refreshTasks();
  }

  async refreshTasks() {
    
    const token = await this.keycloak.getToken();    //console.log(token);
    ///query/v1/process-instances?page=0&size=20
    const response = await fetch('/query/v1/tasks?page=0&size=20', {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(data => data.json())
    //.then(js => { this.pss = (<any[]>js.list.entries).flatMap(a => a.entry ) })
    .then( js => js.list.entries)
    .then( entries => this.tss = (<any[]>entries).flatMap(a => a.entry ))
    .catch(err => console.error(err));
  }
}

const task = {
  "serviceName": "rb",
  "serviceFullName": "rb",
  "serviceVersion": "",
  "appName": "default-app",
  "appVersion": "1",
  "id": "755f254e-9b07-11ee-84bc-0242ac130006",
  "name": "Receive Task",
  "createdDate": "2023-12-15T05:04:43.130+0000",
  "priority": 0,
  "processDefinitionId": "startTimerEventExample:1:5a3d7f2b-9b07-11ee-84bc-0242ac130006",
  "processInstanceId": "7520bcbb-9b07-11ee-84bc-0242ac130006",
  "processDefinitionVersion": 1,
  "processDefinitionName": "Timer start event example",
  "taskDefinitionKey": "receive",
  "status": "CREATED",
  "lastModified": "2023-12-15T05:04:43.130+0000",
  "standalone": false,
  "inFinalState": false,
  "candidateUsers": [],
  "candidateGroups": [],
};