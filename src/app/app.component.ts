import { Component, Input, OnInit} from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {  KeycloakProfile } from 'keycloak-js';
import Keycloak from 'keycloak-js';

// const keycloak = new Keycloak({
//   realm: 'activiti',
//   url: 'http://host.docker.internal/auth',
//   clientId: 'activiti'
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navLinks = [{link:'/process', title:'Процессы'},{link:'/task',title:'Задачи'},{link:'/event',title:'События'}];
  title = 'kc-angular';
  public isLoggedIn: boolean|undefined = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(
    private readonly keycloak: KeycloakService
    ) {}
  
  // async kc_init(){
  //   try {
  //     const authenticated = await keycloak.init({
  //       onLoad: 'check-sso',
  //       //silentCheckSsoRedirectUri: `/assets/silent-check-sso.html`,
  //       pkceMethod: 'S256', 
  //       //checkLoginIframe: false
  //     });
  //     console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
  //   } catch (error) {
  //       console.error('Failed to initialize adapter:', error);
  //   }
  // }

  public async ngOnInit() {
    // this.kc_init();
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
