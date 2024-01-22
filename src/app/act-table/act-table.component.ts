import { AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActTableDataSource } from './act-table-datasource';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-act-table',
  templateUrl: './act-table.component.html',
  styleUrls: ['./act-table.component.css']
})
export class ActTableComponent implements AfterViewInit {

  _hiddenColumns: string[] = [];
  hide(_t7: string) {
      this._hiddenColumns.push(_t7);
      console.log(this._hiddenColumns);
  }

  @Input() target: string = 'process';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  
  dataSource: ActTableDataSource = new ActTableDataSource(apiString[this.target], this.http, this.keycloak);

  constructor( 
    private readonly keycloak: KeycloakService, 
    private http: HttpClient ){  
      console.log('constructor->', this.target )
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //_displayedColumns = ['id', 'name'];

  get displayedColumns(): string[]{
    return Object.keys(objectColumns[this.target]).filter((v) => {
      return this._hiddenColumns.indexOf(v) == -1;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource = new ActTableDataSource(
      apiString[this.target], 
      this.http, 
      this.keycloak);
    this.dataSource!.sort = this.sort;
    this.dataSource!.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

 
  // async refreshData(){
  //   const token = await this.keycloak.getToken();    
  //   const response = await fetch(apiString[this.target], {
  //     headers: {
  //       "Accept": 'application/json',
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //   .then(data => data.json())
  //   .then( js => js.list.entries)
  //   // .then( entries => this.dataSource.setData((<any[]>entries).flatMap(a => a.entry )))
  //   .catch(err => console.error(err));
  // }
}

const apiString: any = {
  process: "/query/v1/process-instances",
  task: "/rb/v1/tasks",
  event: "/audit/v1/events",
  model: "/rb/v1/process-definitions",
  apps: "/query/v1/applications"
}

const objectColumns: any = {
  process: {
    "appVersion": "1",
    "appName": "default-app",
    "serviceName": "rb",
    "serviceFullName": "rb",
    "serviceType": "runtime-bundle",
    "serviceVersion": "",
    "id": "7520bcbb-9b07-11ee-84bc-0242ac130006",
    "startDate": "2023-12-15T05:04:42.965+0000",
    "status": "RUNNING",
    "processDefinitionId": "startTimerEventExample:1:5a3d7f2b-9b07-11ee-84bc-0242ac130006",
    "processDefinitionKey": "startTimerEventExample",
    "processDefinitionVersion": 1,
    "processDefinitionName": "Timer start event example"
  },
  model: {
    "appVersion": "1",
    "appName": "default-app",
    "serviceName": "rb",
    "serviceFullName": "rb",
    "serviceType": "runtime-bundle",
    "serviceVersion": "",
    "id": "5a3d7f2a-9b07-11ee-84bc-0242ac130006",
    "name": "Process Information",
    "key": "processinf-4e42752c-cc4d-429b-9528-7d3df24a9537",
    "description": "my documentation text",
    "version": 1
  },
  event: {
    "id": "754c1c05-67e6-4525-bb40-589a0f987f99",
    "timestamp": 1702616681661,
    "entity": {
        "appVersion": "1",
        "id": "5a3d7f2c-9b07-11ee-84bc-0242ac130006",
        "version": 1,
        "key": "testBpmnErrorConnectorProcess"
    },
    "appName": "default-app",
    "serviceFullName": "rb",
    "appVersion": "1",
    "serviceName": "rb",
    "serviceVersion": "",
    "serviceType": "runtime-bundle",
    "entityId": "5a3d7f2c-9b07-11ee-84bc-0242ac130006",
    "sequenceNumber": 1,
    "messageId": "aee6b643-284e-499e-9bcf-704a5c632d87",
    "eventType": "PROCESS_DEPLOYED"
    },
    task: {
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
    }
  }
