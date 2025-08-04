import { BaseService } from './BaseService';
import { UserProfile } from '@/types/UserProfile';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

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
   * Create a user profile in Firestore after authentication
   * @param user - The Firebase Auth User object
   * @param extraData - Additional user profile data
   * @returns Promise that resolves when the profile is created
   */
  async createFromAuth(user: User, extraData: Partial<UserProfile>): Promise<void> {
    try {
      const now = Timestamp.now();

      // Create the user profile with default values and data from auth
      const userProfile: UserProfile = {
        email: user.email || '',
        username: extraData.username || user.email?.split('@')[0] || '',
        phoneNumber: user.phoneNumber || extraData.phoneNumber || null,
        firstName: extraData.firstName || '',
        lastName: extraData.lastName || '',
        googleId: user.providerData.some(p => p.providerId === 'google.com') ? user.uid : null,
        facebookId: user.providerData.some(p => p.providerId === 'facebook.com') ? user.uid : null,
        authProvider: user.providerData[0]?.providerId || 'email',
        dateJoined: now,
        lastLogin: now,
        isActive: true,
        isStaff: extraData.isStaff || false,
        isSuperuser: extraData.isSuperuser || false,
        displayName: user.displayName || extraData.displayName || `${extraData.firstName || ''} ${extraData.lastName || ''}`.trim(),
        photoURL: user.photoURL || extraData.photoURL || null,
        ...extraData
      };

      // Create the user document in Firestore
      await this.create(user.uid, userProfile);
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to create user profile from auth: ${typedError.message}`);
    }
  }

  /**
   * Update a user profile
   * @param uid - The user ID
   * @param updates - The profile updates
   * @returns Promise that resolves when the profile is updated
   */
  async updateProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      // Update the lastLogin timestamp if not provided
      if (!updates.lastLogin) {
        updates.lastLogin = Timestamp.now();
      }

      // Update the user profile
      await this.update(uid, updates);
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to update user profile: ${typedError.message}`);
    }
  }

  /**
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
