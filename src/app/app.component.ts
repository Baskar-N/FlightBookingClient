import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  IsUserLogged:boolean = false;

  constructor(private router:Router, public authGuardService:AuthGuardService)
  {

  }

  ngOnInit(){
    this.authGuardService.IsUserLogged.subscribe((result:boolean) =>
    {
      this.IsUserLogged = result;
    });
  }

  
}
