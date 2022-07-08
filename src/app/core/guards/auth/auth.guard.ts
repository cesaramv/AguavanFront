import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> {
    return this.authenticationService.validateSession().pipe(
      tap(isVerified => {
        if(!isVerified){
          this.router.navigate(['/']);
        }
        return isVerified;
      })
    );
  }
  
}
