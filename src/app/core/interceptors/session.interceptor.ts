import { async } from '@angular/core/testing';
import { catchError, switchMap } from 'rxjs/operators';
import { SecurityService } from './../../shared/security/security.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import * as utf8 from 'utf8';

@Injectable()
export class SessionInterceptor { //implements HttpInterceptor {
    constructor(
        private securityService: SecurityService
    ) { }

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //if(this.findValue(req.url, ))
        const body: string = !req.body ? '' : JSON.stringify(req.body);
        const headerParams = !!req.urlWithParams.split('?')[1] ? req.urlWithParams.split('?')[1] : '';
        const body_utf8: string = utf8.encode(body);
        const hmac: string = this.securityService.hmac(
            req.method.toLowerCase() + body + headerParams,
            backendSymmetricKey
        );
        return of(
            this.securityService.forgeAesEncrypt(body_utf8, backendSymmetricKey),
        ).pipe(
            switchMap((encryptedData: any) => {
                const header: HttpHeaders = req.headers
                    .set('x-security-hmac', hmac)
                    .set('Content-Type', 'application/json');
                const newReq = req.clone({
                    headers: header,
                    body: encryptedData,
                    url: this.securityService.forgeAesEncryptAndEncode(
                        req.urlWithParams,
                        backendSymmetricKey
                    ),
                    params: new HttpParams({})
                });
                return next.handle(newReq).pipe(
                    switchMap(async (event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            let _body = '';
                            if (!!event.body && event.body !== '') {
                                _body = await this.securityService.forgeAesDecrypt(
                                    event.body,
                                    backendSymmetricKey
                                );
                            }
                            return event.clone({
                                body: _body
                            });
                        }

                    })
                );
            }),
            catchError((httpErrorResponse: HttpErrorResponse) => this.handleAuthError(req, httpErrorResponse))
        );
    } */

    public findValue(url: string, urls_encrypt: string[]): boolean {
        return urls_encrypt.some((data) => url.includes(data));
    }

    /* private handleAuthError(
        req: HttpRequest<any>,
        httpErrorResponse: HttpErrorResponse
    ) {
        this.loader.toggleLoader(false);
        if(!this.findValue(req.url, noBlockingEndpoints)){
            this.modalService.openTechnicalIssues(
                httpErrorResponse.status === 0 || httpErrorResponse.status === 401
            );
        }
        return throwError(httpErrorResponse);
    } */

}