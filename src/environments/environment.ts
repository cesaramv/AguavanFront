// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  HOST: 'http://localhost:8080',

  production: false,
  
  //Para el logueo
  TOKEN_AUTH_USERNAME: 'aguaappred',
  TOKEN_AUTH_PASSWORD: 'van2017Col',
  TOKEN_NAME: 'access_token',
  REINTENTOS: 2,

  //Para consumir siigo
  Authorization: 'Basic U2lpZ29XZWI6QUJBMDhCNkEtQjU2Qy00MEE1LTkwQ0YtN0MxRTU0ODkxQjYx',
  'Content-Type': 'application/x-www-form-urlencoded',
  grant_type: 'password',
  username: 'EMPRESA2CAPACITACION\\empresa2@apionmicrosoft.com',
  password: 's112pempresa2#',
  scope: 'WebApi',
  'Ocp-Apim-Subscription-Key': "184165d1878e45f2910bc99e870ac781"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
