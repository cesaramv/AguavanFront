import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service'; //'@core/services';
import { TranslateService } from '@ngx-translate/core';

export interface FormComponent {
  hasChanges: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<FormComponent> {

  constructor(
    private readonly alertService: AlertService,
    private readonly translate: TranslateService
  ) {}

  canDeactivate(
    component: FormComponent,
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ) {
      if (component.hasChanges()) {
        return this.alertService.confirm(this.translate.instant('global.onDeactivate'));
      }
  
      return true;
  }
  
}
