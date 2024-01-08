import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessComponent } from './process/process.component';
import { TaskComponent } from './task/task.component';
import { EventComponent } from './event/event.component';
import { ModelComponent } from './model/model.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ActivitiAppComponent } from './activiti-app/activiti-app.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        realm: 'activiti',
        url: 'http://host.docker.internal/auth',
        clientId: 'activiti'
      },
      initOptions: {
          onLoad: 'check-sso',
        // onLoad: 'login-required',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256', 
    // must match to the configured value in keycloak
    //    redirectUri: 'http://localhost:4200/',   
    // this will solved the error 
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProcessComponent,
    TaskComponent,
    EventComponent,
    ModelComponent,
    ActivitiAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
