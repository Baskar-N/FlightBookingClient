import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Helper } from '../shared/helper';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthGuardService, private helper:Helper) {
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
        if(err.status === environment.statusCode401)
        {
          //this.authService.Logout();
        }

        const error = err.error?.status || err.statusText;
        this.helper.showSnackBar(error, 5000, "DeleteSnackBar")

        return throwError(() => err);;
    }));
  }
}
