import { environment } from './../../../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc'

export const authConfig: AuthConfig = {
    issuer: environment.authUrl,
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,//environment.redirectUri,
    clientId: environment.clientId,
    scope: environment.scope,
    responseType: environment.responseType,
    customQueryParams: environment.customQueryParams,
    showDebugInformation: environment.showDebugInformation,
    sessionChecksEnabled: environment.sessionChecksEnabled,
    postLogoutRedirectUri: environment.postLogoutRedirectUri
}