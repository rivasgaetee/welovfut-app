import { BaseService } from './BaseService';
import { UserProfile } from '@/types/UserProfile';

/**
 * Service for handling User Profile documents in Firestore
 */
export class UserService extends BaseService<UserProfile> {
  /**
   * Constructor for the UserService
   */
  constructor() {
    // Pass the collection name to the BaseService constructor
    super('users');
  }

  /**
   * Example of extending the base service with a custom method
   * Find a user by their email
   * @param email - The email to search for
   * @returns Promise resolving to the user or null if not found
   */
  async findByEmail(email: string): Promise<UserProfile | null> {
    try {
      // Get all users and filter by email
      // In a real application, you would use a Firestore query for this
      const users = await this.getAll();
      const user = users.find(user => user.email === email);
      return user || null;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to find user by email: ${typedError.message}`);
    }
  }
}

// Export a singleton instance of the service
export const userService = new UserService();