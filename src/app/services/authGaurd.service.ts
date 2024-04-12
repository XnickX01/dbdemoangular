import { Injectable } from '@angular/core';
import { ExpressServiceService } from './express-service.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private expressService: ExpressServiceService) { }

  canActivate(): boolean {
    console.log('AuthGuard#canActivate called', this.expressService.userLoggedIn.value);
    return this.expressService.userLoggedIn.value;
  }
}