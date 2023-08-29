// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebase: {
    projectId: 'inventario-cyc',
    appId: '1:1035954968064:web:7d9d2c82cba92706e46ae5',
    databaseURL: 'https://inventario-cyc-default-rtdb.firebaseio.com',
    storageBucket: 'inventario-cyc.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyD44QlFwGPYeryJX4v4XYvKG39WqHK1f4s',
    authDomain: 'inventario-cyc.firebaseapp.com',
    messagingSenderId: '1035954968064',
    measurementId: 'G-PR4WPZF2D9',
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
