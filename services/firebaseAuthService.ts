import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged 
} from 'firebase/auth';
import { auth } from '@/constants/firebase';
import { IAuthService } from './IAuthService';
import { mapFirebaseErrorToMessage } from './auth/utils';

/**
 * Firebase implementation of the IAuthService interface
 */
export class FirebaseAuthService implements IAuthService {
  /**
   * Logs in a user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to the authenticated User
   * @throws Error if login fails
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Authentication failed: ${mapFirebaseErrorToMessage(error)}`);
    }
  }

  /**
   * Registers a new user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to the newly created User
   * @throws Error if registration fails
   */
  async register(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Registration failed: ${mapFirebaseErrorToMessage(error)}`);
    }
  }

  /**
   * Logs out the current user
   * @returns Promise that resolves when logout is complete
   * @throws Error if logout fails
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Logout failed: ${mapFirebaseErrorToMessage(error)}`);
    }
  }

  /**
   * Gets the currently authenticated user
   * @returns The current User or null if not authenticated
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Sets up a listener for authentication state changes
   * @param callback Function to call when auth state changes
   * @returns Function to unsubscribe the listener
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(auth, callback);
  }
}

// Export a singleton instance of the service
export const firebaseAuthService = new FirebaseAuthService();
