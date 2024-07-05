import { FIREBASE_CONFIG } from 'config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

export { auth };
