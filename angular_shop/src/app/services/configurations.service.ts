import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {
  private apiUrl: string = 'http://localhost:8081/api';
<<<<<<< HEAD
  private appName: string = 'Magazin componente PC';
  private appOwner: string = 'Endava TEAM';
  private appLogo: string = 'https://cdn-icons-png.flaticon.com/512/4703/4703650.png  ';
=======
  private appName: string = 'Magazin componente pc'
  private appOwner: string = 'UVTeam';
  private appLogo: string = 'https://cdn-icons-png.flaticon.com/512/4703/4703650.png';
>>>>>>> bdeb9ea90abc1ce464f7174998bff2858bc51059

  constructor() { }

  public getApiUrl() {
    return this.apiUrl;
  }

  public getAppName() {
    return this.appName;
  }

  public getAppOwner() {
    return this.appOwner;
  }

  public getAppLogo() {
    return this.appLogo;
  }
}
