// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  metadataServiceUrl: 'http://127.0.0.1:3000/',
  videosUrl: 'http://127.0.0.1:3000/videos',

  authServiceUrl: 'http://127.0.0.1:3010/',

  userDataServiceUrl: 'http://127.0.0.1:3020/',
  favoritesUrl: 'http://127.0.0.1:3020/favorites',
  viewsUrl: 'http://127.0.0.1:3020/views',

  assetServerUrl: 'http://127.0.0.1:4000/',

  httpOptions: { withCredentials: true }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
