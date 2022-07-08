import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

const TOKEN_HEADER_KEY = 'Authorization';
//const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = sessionStorage.getItem(environment.TOKEN_NAME);
        if (token) {
            authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, token)
            });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}]