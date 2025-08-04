import { User } from 'firebase/auth';

/**
 * Interface for authentication services
 * Following the dependency inversion principle, this interface defines
 * the contract that any auth service implementation must follow
 */
export interface IAuthService {
  /**
   * Logs in a user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to the authenticated User
   */
  login(email: string, password: string): Promise<User>;

  /**
   * Registers a new user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to the newly created User
   */
  register(email: string, password: string): Promise<User>;

  /**
   * Logs out the current user
   * @returns Promise that resolves when logout is complete
   */
  logout(): Promise<void>;

  /**
   * Gets the currently authenticated user
   * @returns The current User or null if not authenticated
   */
  getCurrentUser(): User | null;

  /**
   * Sets up a listener for authentication state changes
   * @param callback Function to call when auth state changes
   * @returns Function to unsubscribe the listener
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}