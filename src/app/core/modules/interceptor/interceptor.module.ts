import { Observable } from 'rxjs';
import { NgModule, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
  cookieValue: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = { headers: req.headers.set('ApplicationId', `heitorAndradeDeSouza`) };
    return next.handle(req.clone(headers)).pipe(
    );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    }
  ],
})

export class Interceptor { }
