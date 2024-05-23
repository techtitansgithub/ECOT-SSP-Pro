import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        }
    
        return next.handle(request).pipe(
            tap(
                succ => { },
                err => {
                    if (err.status == 401){
                        localStorage.removeItem('token');
                        this.router.navigateByUrl('/login');
                    }
                }
            )
        )
    }
   
}