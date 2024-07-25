import serviceAccount from "../serviceAccountKey.json";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert({
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
  }),
});

const db = getFirestore();

export { db };
