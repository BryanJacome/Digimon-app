// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDQRiLDK-JAlT2Ks_POX9WSRXccKfJucPE",
    authDomain: "digimon-app-b894f.firebaseapp.com",
    projectId: "digimon-app-b894f",
    storageBucket: "digimon-app-b894f.appspot.com",
    messagingSenderId: "712954692898",
    appId: "1:712954692898:web:b5de4a2cccb4a4b70ed17b"
  },
  baseUrl: 'https://digi-api.com/api/v1/',
  characterSize: 'digimon?pageSize=',
  characterId: 'digimon/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
