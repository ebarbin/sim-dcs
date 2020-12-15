import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: SessionService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log(123123123123123);
    
    request = request.clone({
      setHeaders: {
        Test: `${this.auth.getUser().token}`
      }
    });

    return next.handle(request);
  }
}