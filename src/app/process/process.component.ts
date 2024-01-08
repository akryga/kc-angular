import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

const gateway: string  = "http://host.docker.internal";

import Keycloak from 'keycloak-js';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})


export class ProcessComponent implements OnInit, AfterViewInit{
  pss: Process[] = [];
  displayedColumns: string[] = [ "serviceName",  "serviceFullName", "serviceType",
  "serviceVersion", "id", "startDate", "status","processDefinitionId",
  "processDefinitionKey",  "processDefinitionVersion",  "processDefinitionName"];
  // dataSource = new MatTableDataSource<Process>();
//  "/query/admin/v1/process-instances?page=0&size=20"
// "/query/v1/process-instances?page=0&size=20"
  error: any = {};
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {    // this.dataSource.paginator = this.paginator;
  }

  constructor( private http: HttpClient, 
     private readonly keycloak: KeycloakService ) {
  }

  ngOnInit(): void {
    this.refreshProcesses();
  }

  async refreshProcesses() {
   
    const token = await this.keycloak.getToken();    //console.log(token);
    ///query/v1/process-instances?page=0&size=20
    const response = await fetch('/query/v1/process-instances?page=0&size=20', {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(data => data.json())
    //.then(js => { this.pss = (<any[]>js.list.entries).flatMap(a => a.entry ) })
    .then( js => js.list.entries)
    .then( entries => this.pss = (<any[]>entries).flatMap(a => a.entry ))
    .catch(err => console.error(err));

    console.log()
    //this.pss = tp.flatMap(a => a.entry );

    /*
    this.http.get<any>('/rb/v1/process-instances?page=0&size=20')
      .pipe(map(data => {
        return (<any[]>data.list.entries).flatMap(a => a.entry );
      }))
      .subscribe({
        next: data => console.log(data), 
        error: err => console.error(err), 
        complete: () => console.log('Process-instances count: ')
      });
    */
  }
}

export interface Process {
  id: string,
  serviceName: string,
  "serviceFullName": string,
  "serviceType": string,
  "serviceVersion": string,
  "startDate": string,
  "status": string,
  "processDefinitionId": string,
  "processDefinitionKey": string,
  "processDefinitionVersion": number,
  "processDefinitionName": string
}

// "appVersion": "1",
// "appName": "default-app",
// "serviceName": "rb",
// "serviceFullName": "rb",
// "serviceType": "runtime-bundle",
// "serviceVersion": "",
// "id": "95d263fd-9c64-11ee-98d9-0242ac12000a",
// "startDate": "2023-12-16T22:43:52.122+0000",
// "status": "RUNNING",
// "processDefinitionId": "startTimerEventExample:1:86b9088d-9c64-11ee-98d9-0242ac12000a",
// "processDefinitionKey": "startTimerEventExample",
// "processDefinitionVersion": 1,
// "processDefinitionName": "Timer start event example"
