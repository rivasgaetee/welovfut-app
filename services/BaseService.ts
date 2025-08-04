import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData,
  WithFieldValue,
} from 'firebase/firestore';
import { db } from '@/constants/firebase';

const converter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>): DocumentData => {
    return data as DocumentData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
    return snapshot.data() as T;
  },
});

/**
 * Abstract base service class for Firestore operations
 * @template T - The type of data this service handles
 */
export abstract class BaseService<T extends DocumentData> {
  /**
   * Constructor for the BaseService
   * @param collectionName - The name of the Firestore collection
   */
  constructor(protected readonly collectionName: string) {}

  /**
   * Get all documents from the collection
   * @returns Promise resolving to an array of documents
   */
  async getAll(): Promise<T[]> {
    try {
      const collRef = collection(db, this.collectionName).withConverter(
        converter<T>()
      );
      const querySnapshot = await getDocs(collRef);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to get all documents: ${typedError.message}`);
    }
  }

  /**
   * Get a document by ID
   * @param id - The document ID
   * @returns Promise resolving to the document or null if not found
   */
  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id).withConverter(
        converter<T>()
      );
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to get document by ID: ${typedError.message}`);
    }
  }

  /**
   * Create a new document with the specified ID
   * @param id - The document ID
   * @param data - The document data
   * @returns Promise that resolves when the document is created
   */
  async create(id: string, data: T): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id).withConverter(
        converter<T>()
      );
      await setDoc(docRef, data);
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to create document: ${typedError.message}`);
    }
  }

  /**
   * Update an existing document
   * @param id - The document ID
   * @param data - The partial data to update
   * @returns Promise that resolves when the document is updated
   */
  async update(id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id).withConverter(
        converter<T>()
      );
      await updateDoc(docRef, data as Partial<DocumentData>);
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to update document: ${typedError.message}`);
    }
  }

  /**
   * Delete a document
   * @param id - The document ID
   * @returns Promise that resolves when the document is deleted
   */
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id).withConverter(
        converter<T>()
      );
      await deleteDoc(docRef);
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to delete document: ${typedError.message}`);
    }
  }
}