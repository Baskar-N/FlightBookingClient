import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authGuard:AuthGuardService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.authGuard.getToken();

    if(currentUser)
    {
      req = req.clone( {
        setHeaders : 
        {
          Authorization : 'Bearer ' + currentUser,
        }
      })
    }

    return next.handle(req);
  }
}
