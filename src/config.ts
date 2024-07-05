export const TMDB_CONFIG = {
  basePath: process.env.REACT_APP_TMDB_BASE_PATH,
  tailPath: `api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ko-KR&region=KR`,
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
