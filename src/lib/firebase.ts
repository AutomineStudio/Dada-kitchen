import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Target specific Firestore database instance
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || 'ai-studio-dadakitchen-e1712ff2-321e-4e23-a0c2-9bd79fc50ac6');

// Fallback to default database instance
export const dbDefault = getFirestore(app);

export const auth = getAuth(app);
export default app;
