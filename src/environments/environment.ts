// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  HOST: 'http://localhost:8080',

  production: false,
  
  //Para el logueo
  TOKEN_AUTH_USERNAME: 'user123',
  TOKEN_AUTH_PASSWORD: 'pass123',
  TOKEN_NAME: 'access_token',
  REINTENTOS: 2,

  //Para consumir ###
  Authorization: 'Basic xjdjjdjflff344',
  'Content-Type': 'application/x-www-form-urlencoded',
  grant_type: 'password',
  username: 'EMPRESA1\\empleado@ejemplo.com',
  password: 'D23fkskfhs#',
  scope: 'WebApi',
  'Ocp-Apim-Subscription-Key': "42453rdred665dd6565"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
