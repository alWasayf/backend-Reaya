// Get the imports
import { initializeApp } from "firebase/app";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from "firebase/firestore";

// Init the firebase app
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCv14a7y9lmOcqsxuFaESeyDZtJPR4RXNE",
  authDomain: "reayia.firebaseapp.com",
  projectId: "reayia",
  storageBucket: "reayia.appspot.com",
  messagingSenderId: "285286731520",
  appId: "1:285286731520:web:aa068e2fc8d7984c9bede5",
});

// Export firestore incase we need to access it directly
export const firestore = getFirestore();

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

// Import all your model types
import { Appointment } from "../types/appointment";
import { Babysitter } from "../types/babysitter";
import { Individual } from "../types/individual";

// export all your collections
export const individualsCol = createCollection<Individual>("individuals");
export const appointmentsCol = createCollection<Appointment>("appointments");
export const babysittersCol = createCollection<Babysitter>("babysitters");
