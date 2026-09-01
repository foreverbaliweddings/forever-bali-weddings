import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import firebaseConfigData from '../../firebase-applet-config.json';

// Explicit Firebase configuration matching Firebase Console & Config
export const firebaseConfig = {
  projectId: firebaseConfigData.projectId || 'gen-lang-client-0479077743',
  appId: firebaseConfigData.appId || '1:1056730006758:web:50f7e1674d1766d8b0a727',
  apiKey: firebaseConfigData.apiKey || 'AIzaSyA-6UVDrtLPVje5t76h0FQHL5E_V0edcpQ',
  authDomain: firebaseConfigData.authDomain || 'gen-lang-client-0479077743.firebaseapp.com',
  firestoreDatabaseId:
    firebaseConfigData.firestoreDatabaseId ||
    'ai-studio-foreverbaliweddi-4949496c-57cb-46cd-ba87-0030aea42b07',
  messagingSenderId: firebaseConfigData.messagingSenderId || '1056730006758',
};

// Singleton App Instance
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
  });
} else {
  app = getApp();
}

// Singleton Firestore Instance with custom Database ID
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Singleton Firebase Auth Instance
export const auth: Auth = getAuth(app);
